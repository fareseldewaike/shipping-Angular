import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { IBranch } from 'src/app/models/ibranch';
import { ICity } from 'src/app/models/icity';
import { IGovernorate } from 'src/app/models/igovernorate';
import { BranchService } from 'src/app/shared/services/branch.service';
import { CityService } from 'src/app/shared/services/city.service';
import { GovernorateService } from 'src/app/shared/services/governorate.service';
import { MerchantService } from 'src/app/shared/services/merchant.service';

@Component({
  selector: 'app-merchant-form',
  templateUrl: './merchant-form.component.html',
  styleUrls: ['./merchant-form.component.css']
})
export class MerchantFormComponent implements OnInit{

  merchantId: any;

  branches: IBranch[] = [];
  governs: IGovernorate[] = [];
  cities: ICity[] = [];

  priceCities: ICity[] = [];

  constructor(private merchantService: MerchantService, private branchService: BranchService,
               private governService: GovernorateService, private cityService: CityService,
               private router: Router,
               private activatedRoute: ActivatedRoute) 
  {}


  merchantForm = new FormGroup({
    MerchantName: new FormControl('', [Validators.required, Validators.minLength(3)]),
    Email: new FormControl('', [Validators.required, Validators.email]),
    Password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    BranchId: new FormControl('', Validators.required),
    PhoneNumber: new FormControl('', [Validators.required /*, Validators.pattern(/^01[0125][0-9]{8}$/)*/]),
    Address: new FormControl('', Validators.required),
    StoreName: new FormControl(''),
    governorateId: new FormControl(''),
    CityId: new FormControl(''),
    PickUp: new FormControl(''),
    returnerPercent: new FormControl(''),
  
    //special price
    // PriceGovernId: new FormControl(''),
    // PriceCityId: new FormControl(''),
    // Price: new FormControl(''),


    SpecialPrices: new FormArray([])
  });

  


  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe({
      next: (params) => {
        this.merchantId = params.get('id');
        this.getName.setValue('');
        this.getEmail.setValue('');
        this.getPass.setValue('');
        this.getPhoneNum.setValue('');
        this.getAddress.setValue('');
        this.getStoreName.setValue('');
        this.getPickUp.setValue('');
        this.getreturnerPercent.setValue('');
      
        // this.getPrice.setValue('');
      },
    });
  
  
    this.governService.getAllGoverns().subscribe({
      next: (response) => {
        this.governs = response;
      },
      error: () => {}
    });

    this.cityService.getAllCities().subscribe({
      next: (response) => {
        this.cities = response;
      },
      error: () => {}
    });

    this.branchService.getAllBranches().subscribe({
      next: (response) => {
        this.branches = response;
      },
      error: () => {}
    });
        
    // if (this.merchantId != 0) {
    //   this.merchantService.getMerchantById(this.merchantId).subscribe({
    //     next: (response) => {
    //       this.getName.setValue(response.name);
    //       this.getGovernId.setValue(response.governorateId.toString());
    //       this.getEmail.setValue(response.email.toString());
    //       this.getPickup.setValue(response.pickup.toString());
  
    //     },
    //     error: () => {},
    //   });
    // }
  }
  


  get getName() {
    return this.merchantForm.controls['MerchantName'];
  } 
  get getEmail() {
    return this.merchantForm.controls['Email'];
  }
  get getPass() {
    return this.merchantForm.controls['Password'];
  }
  get getPhoneNum() {
    return this.merchantForm.controls['PhoneNumber'];
  }
  get getAddress() {
    return this.merchantForm.controls['Address'];
  }
  get getStoreName() {
    return this.merchantForm.controls['StoreName'];
  }
  get getPickUp() {
    return this.merchantForm.controls['PickUp'];
  }
  get getreturnerPercent() {
    return this.merchantForm.controls['returnerPercent'];
  }
  get getBranchId() {
    return this.merchantForm.controls['BranchId'];
  }
  get getGovernId() {
    return this.merchantForm.controls['governorateId'];
  }
  get getCityId() {
    return this.merchantForm.controls['CityId'];
  }


  get specialPrices(): FormArray {
    return this.merchantForm.get('SpecialPrices') as FormArray;
  }
  
  addSpecialPrice() {
    const group = new FormGroup({
      governorateId: new FormControl('', Validators.required),
      cityId: new FormControl('', Validators.required),
      price: new FormControl('', Validators.required)
    });
    this.specialPrices.push(group);
  }

  removeSpecialPrice(index: number) {
    this.specialPrices.removeAt(index);
  }


  onGovernorateChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const govId = Number(selectElement.value);
  
    const selectedGov = this.governs.find(g => g.id === govId);
    this.cities = selectedGov ? selectedGov.cities : [];
  }

  onGovernoratePriceChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const govId = Number(selectElement.value);
  
    const selectedGov = this.governs.find(g => g.id === govId);
    this.priceCities = selectedGov ? selectedGov.cities : [];
  }



  merchantHandler() {
    if (this.merchantForm.status == 'VALID') {
      if (this.merchantId == 0) {
        console.log(this.merchantForm);
        this.merchantService.addNewMerchant(this.merchantForm.value).subscribe({
          next: (response) => {
            this.router.navigate(['/merchants'], {
            });
          },
          error: (err) => {
            console.log("Error from server:", err.error);
            console.log(" Validation errors:", err.error.errors);
          }
        });
      } else {
        //edit
        this.merchantService
          .editMerchant(this.merchantId, this.merchantForm.value)
          .subscribe({
            next: () => {
              this.router.navigate(['/merchants']);
            },
          });
      }
    } else {
      console.log('Errorrrrrrrrrr');
    }
  }




}

