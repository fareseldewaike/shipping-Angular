import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private baseUrl = 'http://localhost:5073/api/Order';

  constructor(private http: HttpClient) {}

  getAllOrders(
    pageSize: number,
    pageNum: number,
    status?: number
  ): Observable<any> {
    let params = new HttpParams()
      .set('id', localStorage.getItem('id')?.toString() || '')
      .set('role', localStorage.getItem('role')?.toString() || '')
      .set('pagesize', pageSize.toString())
      .set('pagenum', pageNum.toString());
    if (status !== null && status !== undefined) {
      params = params.set('status', status.toString());
      return this.http.get(`${this.baseUrl}/GetAllOrders`, { params });
    }
    return this.http.get(`${this.baseUrl}/GetAllOrders`, { params });
  }

  getAllOrderReports(
    pageSize: number,
    pageNum: number,
    fromDate?: string,
    toDate?: string,
    status?: number
  ): Observable<any> {
    let params = new HttpParams()
      .set('pagesize', pageSize.toString())
      .set('pagenum', pageNum.toString());

    // Only add the status parameter if it is defined
    if (status !== null && status !== undefined) {
      params = params.set('status', status.toString());
    }

    // Check if fromDate and toDate are defined and not empty
    if (fromDate && fromDate.trim() !== '') {
      params = params.set('fromDate', fromDate);
    }
    if (toDate && toDate.trim() !== '') {
      params = params.set('toDate', toDate);
    }

    console.log('Request Params:', params.toString()); // Log for debugging

    return this.http.get(`${this.baseUrl}/GetOrderReport`, { params });
  }
  deleteOrder(id: number): Observable<any> {
    //const params = new HttpParams().set('id', id.toString());
    return this.http.delete(`${this.baseUrl}/DeleteOrder/${id}`);
  }
}
