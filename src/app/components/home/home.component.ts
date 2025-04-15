import { Component, OnInit } from '@angular/core';
import { HomeService } from 'src/app/shared/services/home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  ordercounts: any;
  role: string = '';
  id: string = '';
  constructor(private homeservice: HomeService) {}

  ngOnInit(): void {
    this.role = localStorage.getItem('role') || '';
    console.log(this.role);
    this.id = localStorage.getItem('id') || '';
    this.homeservice.getcountsofdashboard(this.role, this.id).subscribe({
      next: (response) => {
        console.log(response);
        this.ordercounts = response;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
