import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IBranch } from 'src/app/models/ibranch';
import { IGroup } from 'src/app/models/igroup';
import { BranchService } from 'src/app/shared/services/branch.service';
import { GroupService } from 'src/app/shared/services/group.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css']
})
export class GroupsComponent implements OnInit, OnDestroy{

  groups!: IGroup[];
    mySubscribe: any;
    constructor(private groupService: GroupService, private activatedRoute: ActivatedRoute,
                private router: Router
    ) {}




  ngOnInit(): void {
    this.mySubscribe = this.groupService.getAllGroups().subscribe({
      next: (response) => {
        this.groups = response;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  ngOnDestroy(): void {
    this.mySubscribe.unsubscribe();
  }


  deleteHandler(groupId: number) {
    Swal.fire({
      title: 'هل أنت متأكد؟',
      text: 'لن تتمكن من استرجاع هذا الفرع بعد حذفه!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'نعم، احذفه!',
      cancelButtonText: 'إلغاء',
    }).then((result) => {
      if (result.isConfirmed) {
        this.groupService.deleteGroup(groupId.toString()).subscribe(() => {
          this.groups = this.groups.filter(
            (group) => group.id != groupId
          );
          Swal.fire('تم الحذف!', 'تم حذف الفرع بنجاح.', 'success');
        });
      }
    });
  }



  


}
