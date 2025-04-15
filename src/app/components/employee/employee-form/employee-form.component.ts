import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { IBranch } from 'src/app/models/ibranch';
import { IGroup } from 'src/app/models/igroup';
import { BranchService } from 'src/app/shared/services/branch.service';
import { EmployeeService } from 'src/app/shared/services/employee.service';
import { GroupService } from 'src/app/shared/services/group.service';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css']
})
export class EmployeeFormComponent implements OnInit{

  branches: IBranch[] = [];
  groups: IGroup[] = [];
  employeeId: any;

  emailError: string = '';


  constructor(private branchService: BranchService, private groupService: GroupService, 
               private employeeService: EmployeeService,  
               private router: Router, private activatedRoute: ActivatedRoute) {}



    employeeForm = new FormGroup(
    {
      Name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      Email: new FormControl('', [Validators.required, Validators.email]),
      Password: new FormControl('', [
        Validators.required,
        Validators.minLength(6), 
        Validators.pattern(/^(?=.*[A-Z])/), 
        Validators.pattern(/^(?=.*\d)/),   
        Validators.pattern(/^(?=.*[^a-zA-Z0-9])/), 
      ]),
      BranchId: new FormControl('', [Validators.required]),
      PhoneNumber: new FormControl('', [Validators.required, Validators.pattern(/^(\+?\d{10,15})$/)]),
      GroupId: new FormControl('', [Validators.required]),
      Address: new FormControl('', [Validators.required])
    });



ngOnInit(): void {
  this.activatedRoute.paramMap.subscribe({
    next: (params) => {
      this.employeeId = params.get('id');
      this.getName.setValue('');
      this.getEmail.setValue('');
      this.getPassword.setValue('');
      this.getPhoneNumber.setValue('');
      this.getAddress.setValue('');
    },
  });


  this.branchService.getAllBranches().subscribe({
    next: (response) => {
      this.branches = response;
    },
    error: () => {}
  });

  this.groupService.getAllGroups().subscribe({
    next: (response) => {
      this.groups = response;
    },
    error: () => {}
  });
  
  if (this.employeeId != 0) {
    this.employeeService.getEmployeeById(this.employeeId).subscribe({
      next: (response) => {
        this.getName.setValue(response.name);
        this.getEmail.setValue(response.email);
        this.getPassword.setValue(response.password);
        this.getBranchId.setValue(response.branchId.toString());
        this.getPhoneNumber.setValue(response.phoneNumber);
        this.getGroupId.setValue(response.groupId.toString());
        this.getAddress.setValue(response.address.toString());
      },
      error: () => {},
    });
  }
}


get getName() {
  return this.employeeForm.controls['Name'];
}
get getEmail() {
  return this.employeeForm.controls['Email'];
}
get getPassword() {
  return this.employeeForm.controls['Password'];
}
get getBranchId() {
  return this.employeeForm.controls['BranchId'];
}
get getPhoneNumber() {
  return this.employeeForm.controls['PhoneNumber'];
}
get getGroupId() {
  return this.employeeForm.controls['GroupId'];
}
get getAddress() {
  return this.employeeForm.controls['Address'];
}


employeeHandler() {
  if (this.employeeForm.status === 'VALID') {
    if (this.employeeId == 0) {
      this.employeeService.addNewEmployee(this.employeeForm.value).subscribe({
        next: (response) => {
          this.router.navigate(['/employees']);
        },
        error: (err) => {
          if (err.status == 409) { 
            this.emailError = 'البريد الإلكتروني مستخدم بالفعل';  
          } 
          else {
             alert('Something went wrong while adding the employee.');
          }
          console.log("Error from server:", err.error);
          console.log(" Validation errors:", err.error.errors);
        }
      });
    } 
    else {
      //edit
      this.employeeService.editemployee(this.employeeId, this.employeeForm.value).subscribe({
        next: () => {
          this.router.navigate(['/employees']);
        },
        error: (err) => {
          if (err.status === 409) { 
            this.emailError = 'البريد الإلكتروني مستخدم بالفعل';
          } 
          else {
            alert('Something went wrong while updating the employee.');
          }
        }
      });
    }
  } else {
    console.log('invalid data');
    Object.keys(this.employeeForm.controls).forEach(key => {
      this.employeeForm.get(key)?.markAsTouched();
    });
  }
}


}

