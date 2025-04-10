import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { WeightService } from 'src/app/shared/services/weight.service';

@Component({
  selector: 'app-weight-form',
  templateUrl: './weight-form.component.html',
  styleUrls: ['./weight-form.component.css']
})
export class WeightFormComponent implements OnInit{

  weightId: any;

  constructor(private weightService: WeightService,private router: Router,
               private activatedRoute: ActivatedRoute
  ) 
  {}


  weightForm = new FormGroup(
    {
      DefaultWeight: new FormControl('', [Validators.required]),
      AdditionalPrice: new FormControl('', [Validators.required]),
    });



ngOnInit(): void {
  this.activatedRoute.paramMap.subscribe({
    next: (params) => {
      this.weightId = params.get('id');
      this.getDefaultWeight.setValue('');
      this.getAdditionalPrice.setValue('');
     
    },
  });
  if (this.weightId != 0) {
    this.weightService.getWeightById(this.weightId).subscribe({
      next: (response) => {
        this.getDefaultWeight.setValue(response.defaultWeight.toString());
        this.getAdditionalPrice.setValue(response.additionalPrice.toString());
       
      },
      error: () => {},
    });
  }
}


get getDefaultWeight() {
  return this.weightForm.controls['DefaultWeight'];
}
get getAdditionalPrice() {
  return this.weightForm.controls['AdditionalPrice'];
}



branchHandler() {
  if (this.weightForm.status == 'VALID') {
    if (this.weightId == 0) {
      this.weightService.addNewWeight(this.weightForm.value).subscribe({
        next: (response) => {
          this.router.navigate(['/weights'], {
          });
        },
      });
    } else {
      //edit
      this.weightService
        .editWeight(this.weightId, this.weightForm.value)
        .subscribe({
          next: () => {
            this.router.navigate(['/weights']);
          },
        });
    }
  } else {
    console.log('Errorrrrrrrrrr');
  }
}

}

