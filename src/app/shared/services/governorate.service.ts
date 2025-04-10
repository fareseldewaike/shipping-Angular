import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IGovernorate } from 'src/app/models/igovernorate';

@Injectable({
  providedIn: 'root'
})
export class GovernorateService {

  baseUrl: string = 'http://localhost:5073/api/Governorate';
      constructor(private http: HttpClient) {}
      
        getAllGoverns(): Observable<IGovernorate[]> {
          return this.http.get<IGovernorate[]>(`${this.baseUrl}/All`);
        }
        getGovernById(governId: string): Observable<IGovernorate> {
          return this.http.get<IGovernorate>(`${this.baseUrl}/${governId}`);
        }
        addNewgovern(govern: any): Observable<IGovernorate> {
          return this.http.post<IGovernorate>(this.baseUrl, govern);
        }
        editgovern(governId: string, govern: any): Observable<IGovernorate> {
          return this.http.put<IGovernorate>(`${this.baseUrl}/${governId}`, govern);
        }
        deletegovern(governId: string): Observable<IGovernorate> {
          return this.http.delete<IGovernorate>(`${this.baseUrl}/${governId}`);
        }
}
