import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IWeight } from 'src/app/models/iweight';

@Injectable({
  providedIn: 'root'
})
export class WeightService {

  
    baseUrl: string = 'http://localhost:5073/api/Weight';
      constructor(private http: HttpClient) {}
      
        getAllWeights(): Observable<IWeight[]> {
          return this.http.get<IWeight[]>(this.baseUrl);
        }
        getWeightById(branchId: string): Observable<IWeight> {
          return this.http.get<IWeight>(`${this.baseUrl}/${branchId}`);
        }
        addNewWeight(branch: any): Observable<IWeight> {
          return this.http.post<IWeight>(this.baseUrl, branch);
        }
        editWeight(branchId: string, branch: any): Observable<IWeight> {
          return this.http.put<IWeight>(`${this.baseUrl}/${branchId}`, branch);
        }
        
}
