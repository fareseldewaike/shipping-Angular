import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData:any;
  role:string="";
  name:string="";
  id:string="";
  constructor(private HttpClient:HttpClient,private Router:Router) {}

  saveUserData() {
    if (localStorage.getItem('token') != null) {
      let encodedToken: any = localStorage.getItem('token');
      let decodedToken: any = jwtDecode(encodedToken);
  
      this.userData = decodedToken;
  
      this.role = decodedToken["role"] || decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
      this.name = decodedToken["name"] || decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"];
      this.id = decodedToken["sub"]; 
  
      console.log(this.role);
      // console.log(this.name);
      // console.log(this.id);
      localStorage.setItem("role", this.role);
      console.log(decodedToken);
    }
  }
  

  login(data:object):Observable<any>{
    return this.HttpClient.post('http://localhost:5073/api/account/login',data);
  }

  SignOut(){
    localStorage.removeItem("token")
    localStorage.removeItem("role")
    this.Router.navigate(['/login'])
  }
}