import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IGovernorate } from 'src/app/models/igovernorate';
import { CityService } from 'src/app/shared/services/city.service';
import { GovernorateService } from 'src/app/shared/services/governorate.service';

@Component({
  selector: 'app-city-form',
  templateUrl: './city-form.component.html',
  styleUrls: ['./city-form.component.css']
})
export class CityFormComponent implements OnInit{

  governorates: IGovernorate[] = [];
  cityId: any;

  constructor(private governorateService: GovernorateService, private cityService: CityService,private router: Router,
               private activatedRoute: ActivatedRoute) {}


    cityForm = new FormGroup(
    {
      Name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      GovernorateId: new FormControl('', [Validators.required]),
      Price: new FormControl('', [Validators.required]),
      Pickup: new FormControl('',),
    });



ngOnInit(): void {
  this.activatedRoute.paramMap.subscribe({
    next: (params) => {
      this.cityId = params.get('id');
      this.getName.setValue('');
      this.getPrice.setValue('');
      this.getPickup.setValue('');
    },
  });


  this.governorateService.getAllGoverns().subscribe({
    next: (response) => {
      this.governorates = response;
    },
    error: () => {}
  });
  
  if (this.cityId != 0) {
    this.cityService.getCityById(this.cityId).subscribe({
      next: (response) => {
        this.getName.setValue(response.name);
        this.getGovernId.setValue(response.governorateId.toString());
        this.getPrice.setValue(response.price.toString());
        this.getPickup.setValue(response.pickup.toString());

      },
      error: () => {},
    });
  }
}


get getName() {
  return this.cityForm.controls['Name'];
}

get getPrice() {
  return this.cityForm.controls['Price'];
}

get getPickup() {
  return this.cityForm.controls['Pickup'];
}

get getGovernId() {
  return this.cityForm.controls['GovernorateId'];
}


cityHandler() {
  if (this.cityForm.status == 'VALID') {
    if (this.cityId == 0) {
      this.cityService.addNewCity(this.cityForm.value).subscribe({
        next: (response) => {
          this.router.navigate(['/cities'], {
          });
        },
      });
    } else {
      //edit
      this.cityService
        .editCity(this.cityId, this.cityForm.value)
        .subscribe({
          next: () => {
            this.router.navigate(['/cities']);
          },
        });
    }
  } else {
    console.log('invalid data');
    Object.keys(this.cityForm.controls).forEach(key => {
      this.cityForm.get(key)?.markAsTouched();
    });
  }
}

}

