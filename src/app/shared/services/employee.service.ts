import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICity } from 'src/app/models/icity';
import { Iemployee } from 'src/app/models/iemployee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

    
   baseUrl: string = 'http://localhost:5073/api/Employee';


         constructor(private http: HttpClient) {}     
         
          getAllEmployees(): Observable<Iemployee[]> {
            return this.http.get<Iemployee[]>(`${this.baseUrl}`);
           }
           getEmployeeById(employeeId: string): Observable<Iemployee> {
             return this.http.get<Iemployee>(`${this.baseUrl}/${employeeId}`);
           }
           addNewEmployee(employee: any): Observable<Iemployee> {
             return this.http.post<Iemployee>(this.baseUrl, employee);
           }
           editemployee(employeeId: string, employee: any): Observable<Iemployee> {
             return this.http.put<Iemployee>(`${this.baseUrl}/${employeeId}`, employee);
           }
           deleteEmployee(employeeId: string): Observable<Iemployee> {
             return this.http.delete<Iemployee>(`${this.baseUrl}/${employeeId}`);
           }
 

 
}
