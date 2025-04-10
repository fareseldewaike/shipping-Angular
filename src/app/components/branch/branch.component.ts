import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IBranch } from 'src/app/models/ibranch';
import { BranchService } from 'src/app/shared/services/branch.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-branch',
  templateUrl: './branch.component.html',
  styleUrls: ['./branch.component.css']
})
export class BranchComponent implements OnInit, OnDestroy{

  branches!: IBranch[];
    mySubscribe: any;
    constructor(private branchService: BranchService, private activatedRoute: ActivatedRoute,
                private router: Router
    ) {}




  ngOnInit(): void {
    this.mySubscribe = this.branchService.getAllBranches().subscribe({
      next: (response) => {
        this.branches = response;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  ngOnDestroy(): void {
    this.mySubscribe.unsubscribe();
  }


  deleteHandler(branchId: number) {
    Swal.fire({
      title: 'هل أنت متأكد؟',
      text: 'لن تتمكن من استرجاع هذا الفرع بعد حذفه!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'نعم، احذفه!',
      cancelButtonText: 'إلغاء',
    }).then((result) => {
      if (result.isConfirmed) {
        this.branchService.deleteProduct(branchId.toString()).subscribe(() => {
          this.branches = this.branches.filter(
            (branch) => branch.id != branchId
          );
          Swal.fire('تم الحذف!', 'تم حذف الفرع بنجاح.', 'success');
        });
      }
    });
  }



  toggleStatus(branch: IBranch) {

    const newStatus = !branch.status;
  
    this.branchService.changeBranchStatus(branch.id, newStatus).subscribe({
      next: () => {
        branch.status = newStatus;
      },
      error: (error) => {
        console.error('فشل في تغيير الحالة:', error);
      }
    });
  }
  


}
