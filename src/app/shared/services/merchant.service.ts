import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IGroup } from 'src/app/models/igroup';
import { IMerchant } from 'src/app/models/imerchants';

@Injectable({
  providedIn: 'root'
})
export class MerchantService {

  
       baseUrl: string = 'http://localhost:5073/api/Merchant';
  
    
        constructor(private http: HttpClient) {}
        
          getAllMerchants(): Observable<IMerchant[]> {
            return this.http.get<IMerchant[]>(`${this.baseUrl}/all`);
          }
          getMerchantById(merchantId: string): Observable<IMerchant> {
            return this.http.get<IMerchant>(`${this.baseUrl}/MerchantWithSpecialPrices/${merchantId}`);
          }
          addNewMerchant(merchant: any): Observable<IMerchant> {
            return this.http.post<IMerchant>(`${this.baseUrl}/register`, merchant);
          }
          editMerchant(merchantId: string, merchant: any): Observable<IMerchant> {
            return this.http.put<IMerchant>(`${this.baseUrl}/updateeee/${merchantId}`, merchant);
          }
          deleteMerchant(merchantId: string): Observable<IMerchant> {
            return this.http.delete<IMerchant>(`${this.baseUrl}/delete/${merchantId}`);
          }
    
}
