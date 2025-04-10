import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IBranch } from 'src/app/models/ibranch';
import { IGroup } from 'src/app/models/igroup';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

     baseUrl: string = 'http://localhost:5073/api/Group';

  
      constructor(private http: HttpClient) {}
      
        getAllGroups(): Observable<IGroup[]> {
          return this.http.get<IGroup[]>(`${this.baseUrl}/AllGroups`);
        }
        getGroupById(groupId: string): Observable<IGroup> {
          return this.http.get<IGroup>(`${this.baseUrl}/${groupId}`);
        }
        addNewGroup(group: any): Observable<IGroup> {
          return this.http.post<IGroup>(`${this.baseUrl}/AddGroup`, group);
        }
        editGroup(groupId: string, group: any): Observable<IGroup> {
          return this.http.put<IGroup>(`${this.baseUrl}/UpdateGroup/${groupId}`, group);
        }
        deleteGroup(groupId: string): Observable<IGroup> {
          return this.http.delete<IGroup>(`${this.baseUrl}/RemoveGroup/${groupId}`);
        }
  
        
        
}
