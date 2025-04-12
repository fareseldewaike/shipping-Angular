import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICity } from 'src/app/models/icity';

@Injectable({
  providedIn: 'root'
})
export class CityService {


    baseUrl: string = 'http://localhost:5073/api/City';
      constructor(private http: HttpClient) {}
      
      
       getAllCities(): Observable<ICity[]> {
         return this.http.get<ICity[]>(`${this.baseUrl}/All`);
        }
        getCityById(cityId: string): Observable<ICity> {
          return this.http.get<ICity>(`${this.baseUrl}/${cityId}`);
        }
        addNewCity(city: any): Observable<ICity> {
          return this.http.post<ICity>(this.baseUrl, city);
        }
        editCity(cityId: string, city: any): Observable<ICity> {
          return this.http.put<ICity>(`${this.baseUrl}/${cityId}`, city);
        }
        deleteCity(cityId: string): Observable<ICity> {
          return this.http.delete<ICity>(`${this.baseUrl}/${cityId}`);
        }

  
}
