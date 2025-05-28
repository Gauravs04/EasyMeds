import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { Users } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(
    private http: HttpClient,
    private apiService: ApiService,
  ) {  }

  getAllUsers(): Observable<any> {
    return this.apiService.getAllUsers()
    
  }

  // updateUsers(userId: string): Observable<any> {
  //   const url = `${appConfig.apiUrl}/User/Edit-User/${userId}`;
  //   return this.http.put(url, userId);
  // }
  updateUsers(user: Users): Observable<any> {
    return this.apiService.updateUsers(user)
  }

  deleteUser(userId: string): Observable<any> {
    return this.apiService.deleteUser(userId)
  }

  addUser(user: Users): Observable<any> {
    return this.apiService.addUser(user)
  }
  
}
