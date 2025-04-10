import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IWeight } from 'src/app/models/iweight';
import { WeightService } from 'src/app/shared/services/weight.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-weight',
  templateUrl: './weight.component.html',
  styleUrls: ['./weight.component.css']
})
export class WeightComponent implements OnInit, OnDestroy{

  weights!: IWeight[];
    mySubscribe: any;
    constructor(private weightervice: WeightService, private activatedRoute: ActivatedRoute,
                private router: Router
    ) {}




  ngOnInit(): void {
    this.mySubscribe = this.weightervice.getAllWeights().subscribe({
      next: (response) => {
        this.weights = response;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  ngOnDestroy(): void {
    this.mySubscribe.unsubscribe();
  }


  // deleteHandler(branchId: number) {
  //   Swal.fire({
  //     title: 'هل أنت متأكد؟',
  //     text: 'لن تتمكن من استرجاع هذا الفرع بعد حذفه!',
  //     icon: 'warning',
  //     showCancelButton: true,
  //     confirmButtonText: 'نعم، احذفه!',
  //     cancelButtonText: 'إلغاء',
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       this.branchService.deleteProduct(branchId.toString()).subscribe(() => {
  //         this.branches = this.branches.filter(
  //           (branch) => branch.id != branchId
  //         );
  //         Swal.fire('تم الحذف!', 'تم حذف الفرع بنجاح.', 'success');
  //       });
  //     }
  //   });
  // }
}

