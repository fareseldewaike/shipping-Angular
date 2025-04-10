import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IBranch } from 'src/app/models/ibranch';

@Injectable({
  providedIn: 'root'
})
export class BranchService {

  baseUrl: string = 'http://localhost:5073/api/Branch';
    constructor(private http: HttpClient) {}
    
      getAllBranches(): Observable<IBranch[]> {
        return this.http.get<IBranch[]>(this.baseUrl);
      }
      getBranchById(branchId: string): Observable<IBranch> {
        return this.http.get<IBranch>(`${this.baseUrl}/${branchId}`);
      }
      addNewBranch(branch: any): Observable<IBranch> {
        return this.http.post<IBranch>(this.baseUrl, branch);
      }
      editBranch(branchId: string, branch: any): Observable<IBranch> {
        return this.http.put<IBranch>(`${this.baseUrl}/${branchId}`, branch);
      }
      deleteProduct(branchId: string): Observable<IBranch> {
        return this.http.delete<IBranch>(`${this.baseUrl}/${branchId}`);
      }

      changeBranchStatus(branchId: number, newStatus: boolean) {
        return this.http.put(`${this.baseUrl}/${branchId}/status`, { status: newStatus });
      }
      
      
}
