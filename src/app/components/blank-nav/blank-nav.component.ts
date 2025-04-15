import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/Auth.service';

@Component({
  selector: 'app-blank-nav',
  templateUrl: './blank-nav.component.html',
  styleUrls: ['./blank-nav.component.css']
})
export class BlankNavComponent implements OnInit {

 

  role: string = '';
  navigation : string ="";
  constructor(private _authService: AuthService) { }

  ngOnInit() {
    this.role = localStorage.getItem('role') || '';
    if(this.role == 'admin') {
      this.navigation = 'branches';
    }
    else {
      this.navigation = 'Order';

    }
  }
  SignOut(){
    this._authService.SignOut();
  }
}
