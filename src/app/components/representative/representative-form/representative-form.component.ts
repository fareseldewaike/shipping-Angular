import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { IBranch } from 'src/app/models/ibranch';
import { IGovernorate } from 'src/app/models/igovernorate';
import { BranchService } from 'src/app/shared/services/branch.service';
import { GovernorateService } from 'src/app/shared/services/governorate.service';
import { RepresentativeService } from 'src/app/shared/services/representative.service';

@Component({
  selector: 'app-representative-form',
  templateUrl: './representative-form.component.html',
  styleUrls: ['./representative-form.component.css']
})
export class RepresentativeFormComponent implements OnInit {

  representId: any;
  branches: IBranch[] = [];
  governs: IGovernorate[] = [];

  errorMessages: { Email: string; Name: string} = {
    Email: '',
    Name: '',
  };

  constructor(
    private representsService: RepresentativeService,
    private branchService: BranchService,
    private governService: GovernorateService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  represntForm = new FormGroup({
    Name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    Email: new FormControl('', [Validators.required, Validators.email]),
    Password: new FormControl('', [
      Validators.required,
      Validators.minLength(6), 
      Validators.pattern(/^(?=.*[A-Z])/), 
      Validators.pattern(/^(?=.*\d)/),   
      Validators.pattern(/^(?=.*[^a-zA-Z0-9])/), 
    ]),
    BranchId: new FormControl('', Validators.required),
    Phone: new FormControl('', [Validators.required, Validators.pattern(/^(\+?\d{10,15})$/)]),
    Address: new FormControl('', Validators.required),
    Amount: new FormControl(''),
    GovernorateIds: new FormControl([], Validators.required) 
  });

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe({
      next: (params) => {
        this.representId = params.get('id');
        this.getName.setValue('');
        this.getEmail.setValue('');
        this.getPass.setValue('');
        this.getPhoneNum.setValue('');
        this.getAddress.setValue('');
        this.getAmount.setValue('');
      }
    });

    this.governService.getAllGoverns().subscribe({
      next: (response) => {
        this.governs = response;
      },
      error: () => {}
    });

    this.branchService.getAllBranches().subscribe({
      next: (response) => {
        this.branches = response;
      },
      error: () => {}
    });
  }

  // Getters
  get getName() { 
    return this.represntForm.controls['Name']; 
  } 
  get getEmail() { 
    return this.represntForm.controls['Email']; 
  }
  get getPass() { 
    return this.represntForm.controls['Password']; 
  }
  get getPhoneNum() { 
    return this.represntForm.controls['Phone']; 
  }
  get getAddress() { 
    return this.represntForm.controls['Address']; 
  }
  get getAmount() { 
    return this.represntForm.controls['Amount']; 
  }
  get getBranchId() { 
    return this.represntForm.controls['BranchId']; 
  }
  get getGovernIds() { 
    return this.represntForm.controls['GovernorateIds']; 
  }  

  reprsntHandler() {
    if (this.represntForm.valid) {
  
      const rawData = this.represntForm.value;
      const formData: any = {...rawData,
        governorates: Array.isArray(rawData.GovernorateIds) 
          ? rawData.GovernorateIds.map((id: number) => ({ id })) : []
      };

      if (this.representId == 0) {
        console.log('Data', formData);
  
        this.representsService.addNewRepresentative(formData).subscribe({
          next: () => {
            this.router.navigate(['/Representatives']);
          },
          error: (err) => { 
            if (err.status === 400 && Array.isArray(err.error)) {
              err.error.forEach((error: any) => {
                // console.log('Error code =>', error.code);
          
                if (error.code === 'DuplicateEmail') {
                  this.errorMessages.Email = 'البريد الإلكتروني مستخدم بالفعل';
                }
          
                if (error.code === 'DuplicateUserName') {
                  this.errorMessages.Name = 'الاسم مستخدم بالفعل';
                }
              });
            }
            else {
              console.log('Error from server:', err);
            }
          }
        });
      }
  
    } else {
      console.log('invalid data');
      console.log(this.represntForm);
    }
  }
  
  

}