import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BranchService } from 'src/app/shared/services/branch.service';

@Component({
  selector: 'app-branch-form',
  templateUrl: './branch-form.component.html',
  styleUrls: ['./branch-form.component.css']
})
export class BranchFormComponent implements OnInit{

  branchId: any;

  constructor(private branchService: BranchService,private router: Router,
               private activatedRoute: ActivatedRoute
  ) 
  {}


  branchForm = new FormGroup(
    {
      Name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      status: new FormControl<boolean | null>(null, Validators.required)
    });



ngOnInit(): void {
  this.activatedRoute.paramMap.subscribe({
    next: (params) => {
      this.branchId = params.get('id');
      this.getName.setValue('');
      this.getStatus.setValue(null);
     
    },
  });
  if (this.branchId != 0) {
    this.branchService.getBranchById(this.branchId).subscribe({
      next: (response) => {
        this.getName.setValue(response.name);
        this.getStatus.setValue(response.status);
       
      },
      error: () => {},
    });
  }
}


get getName() {
  return this.branchForm.controls['Name'];
}
get getStatus() {
  return this.branchForm.controls['status'];
}



branchHandler() {
  if (this.branchForm.status == 'VALID') {
    if (this.branchId == 0) {
      this.branchService.addNewBranch(this.branchForm.value).subscribe({
        next: (response) => {
          this.router.navigate(['/branches'], {
          });
        },
      });
    } else {
      //edit
      this.branchService
        .editBranch(this.branchId, this.branchForm.value)
        .subscribe({
          next: () => {
            this.router.navigate(['/branches']);
          },
        });
    }
  } else {
    console.log('invalid data');
    Object.keys(this.branchForm.controls).forEach(key => {
      this.branchForm.get(key)?.markAsTouched();
    });
  }
}


onStatusChange(event: Event) {
  const target = event.target as HTMLInputElement;
  this.getStatus.setValue(target.checked);
}


}
