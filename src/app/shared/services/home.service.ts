import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  constructor(private httpClient: HttpClient) {}

  ordercounts: any;

  getcountsofdashboard(role: any, id: string): Observable<any> {
    if (role == 'Representative') {
      const params = new HttpParams().set('representativeid', id);
      return this.httpClient.get(
        'http://localhost:5073/api/DashBoard/GetRepresentativeDashBorad',
        { params }
      );
    } else if (role == 'Merchant') {
      const params = new HttpParams().set('merchantid', id);
      return this.httpClient.get(
        'http://localhost:5073/api/DashBoard/GetMerchantDashBorad',
        { params }
      );
    } else {
      return this.httpClient.get(
        'http://localhost:5073/api/DashBoard/GetEmployeeDashBorad'
      );
    }
  }
}
