import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GovernorateService } from 'src/app/shared/services/governorate.service';

@Component({
  selector: 'app-governorate-form',
  templateUrl: './governorate-form.component.html',
  styleUrls: ['./governorate-form.component.css']
})
export class GovernorateFormComponent  implements OnInit{

  governId: any;

  constructor(private governService: GovernorateService,private router: Router,
               private activatedRoute: ActivatedRoute
  ) 
  {}


    governForm = new FormGroup(
    {
      Name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      
    });



ngOnInit(): void {
  this.activatedRoute.paramMap.subscribe({
    next: (params) => {
      this.governId = params.get('id');
      this.getName.setValue('');
    },
  });
  if (this.governId != 0) {
    this.governService.getGovernById(this.governId).subscribe({
      next: (response) => {
        this.getName.setValue(response.name);
       
      },
      error: () => {},
    });
  }
}


get getName() {
  return this.governForm.controls['Name'];
}



governHandler() {
  if (this.governForm.status == 'VALID') {
    if (this.governId == 0) {
      this.governService.addNewgovern(this.governForm.value).subscribe({
        next: (response) => {
          this.router.navigate(['/governorates'], {
          });
        },
      });
    } else {
      //edit
      this.governService
        .editgovern(this.governId, this.governForm.value)
        .subscribe({
          next: () => {
            this.router.navigate(['/governorates']);
          },
        });
    }
  } else {
    console.log('Errorrrrrrrrrr');
  }
}

}
