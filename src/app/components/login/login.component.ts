import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/Auth.service';
 

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  error:string="";
  userForm:FormGroup
  constructor(private fb:FormBuilder ,private Router:Router ,private authService:AuthService  ){
    this.userForm=fb.group({
      email:['',[Validators.required]],
      password:['',[Validators.required]],
    })
  }
  ngOnInit(): void {
 
  }
  get email(){
    return this.userForm.get("email")
  }
  get password(){
    return this.userForm.get("password")
  }
  Submit(){
    if(this.userForm.valid){
    this.authService.login(this.userForm.value).subscribe({
      next:(response)=>{
        console.log(response)
        if(response.message == "Login successful"){
          alert("تم تسجيل الدخول بنجاح");
        localStorage.setItem('token',response.token);
         this.authService.saveUserData();
        this.Router.navigate(['/home']);
            this.error=""
        }
      }
      ,error:(err:HttpErrorResponse)=>{
        
          this.error ="من فضلك أدخل بيانات صالحة";
        
      }
    })
    
  }

 
}}
