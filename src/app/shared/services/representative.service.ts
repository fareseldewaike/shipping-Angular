import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IMerchant } from 'src/app/models/imerchants';
import { IRepresentative } from 'src/app/models/irepresentative';

@Injectable({
  providedIn: 'root'
})
export class RepresentativeService {

  baseUrl: string = 'http://localhost:5073/api/Representative';
    
      
          constructor(private http: HttpClient) {}
          
            getAllRepresentatives(): Observable<IRepresentative[]> {
              return this.http.get<IRepresentative[]>(`${this.baseUrl}/all`);
            }
            getRepresentativeById(ReprstId: string): Observable<IRepresentative> {
              return this.http.get<IRepresentative>(`${this.baseUrl}/${ReprstId}`);
            }
            addNewRepresentative(Reprst: any): Observable<IRepresentative> {
              return this.http.post<IRepresentative>(`${this.baseUrl}/register`, Reprst);
            }
            deleteRepresentative(ReprstId: string): Observable<IRepresentative> {
              return this.http.delete<IRepresentative>(`${this.baseUrl}/${ReprstId}`);
            }
}
