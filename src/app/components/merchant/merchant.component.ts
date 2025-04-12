import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IMerchant } from 'src/app/models/imerchants';
import { MerchantService } from 'src/app/shared/services/merchant.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-merchant',
  templateUrl: './merchant.component.html',
  styleUrls: ['./merchant.component.css']
})
export class MerchantComponent implements OnInit, OnDestroy{

      merchants!: IMerchant[];
      mySubscribe: any;
      constructor(private merchantService: MerchantService, private activatedRoute: ActivatedRoute,
                  private router: Router
      ) {}




      ngOnInit(): void {
        this.mySubscribe = this.merchantService.getAllMerchants().subscribe({
          next: (response) => {
            this.merchants = response;
          },
          error: (error) => {
            console.log(error);
          },
        });
      }
    
      ngOnDestroy(): void {
        this.mySubscribe.unsubscribe();
      }


      deleteHandler(merchantId: string) {
          Swal.fire({
            title: 'هل أنت متأكد؟',
            text: 'لن تتمكن من استرجاع هذا الفرع بعد حذفه!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'نعم، احذفه!',
            cancelButtonText: 'إلغاء',
          }).then((result) => {
            if (result.isConfirmed) {
              this.merchantService.deleteMerchant(merchantId).subscribe(() => {
                this.merchants = this.merchants.filter(
                  (merchant) => merchant .id != merchantId
                );
                Swal.fire('تم الحذف!', 'تم حذف الفرع بنجاح.', 'success');
              });
            }
          });
        }
  
}
