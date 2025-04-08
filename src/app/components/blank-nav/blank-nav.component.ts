import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/Auth.service';

@Component({
  selector: 'app-blank-nav',
  templateUrl: './blank-nav.component.html',
  styleUrls: ['./blank-nav.component.css']
})
export class BlankNavComponent implements OnInit {

  constructor(private _authService: AuthService) { }

  ngOnInit() {
  }
 
  SignOut(){
    this._authService.SignOut();
  }
}
