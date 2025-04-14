import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Iemployee } from 'src/app/models/iemployee';
import { IRepresentative } from 'src/app/models/irepresentative';
import { EmployeeService } from 'src/app/shared/services/employee.service';
import { RepresentativeService } from 'src/app/shared/services/representative.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-representative',
  templateUrl: './representative.component.html',
  styleUrls: ['./representative.component.css']
})
export class RepresentativeComponent implements OnInit, OnDestroy{

      represents !: IRepresentative[];
      mySubscribe: any;
      constructor(private representService: RepresentativeService, private activatedRoute: ActivatedRoute,
                  private router: Router) {}




      ngOnInit(): void {
        this.mySubscribe = this.representService.getAllRepresentatives().subscribe({
          next: (response) => {
            this.represents = response;
          },
          error: (error) => {
            console.log(error);
          },
        });
      }
    
      ngOnDestroy(): void {
        this.mySubscribe.unsubscribe();
      }


      deleteHandler(ReprId: string) {
          Swal.fire({
            title: 'هل أنت متأكد؟',
            text: 'لن تتمكن من استرجاع هذا المندوب بعد حذفه!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'نعم، احذفه!',
            cancelButtonText: 'إلغاء',
          }).then((result) => {
            if (result.isConfirmed) {
              this.representService.deleteRepresentative(ReprId).subscribe(() => {
                this.represents = this.represents.filter(
                  (employee) => employee .id != ReprId
                );
                Swal.fire('تم الحذف!', 'تم حذف الفرع بنجاح.', 'success');
              });
            }
          });
        }
  
}
