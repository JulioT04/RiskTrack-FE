import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { User } from '../models/user';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  usersPath: string = environment.usersPath ;
  constructor(private http: HttpClient) { }
  
  registerProvider(user : User){
    return this.http.post<User>(`${this.usersPath}Users`,user);
  }

  getUserById(id: string){
    return this.http.get(this.usersPath + 'Users/' + id);
  }

  isUserBasicAuth(email: string, password: string): Observable<{ success: boolean; userId: string }> {
    return this.http.post<{ success: boolean; userId: string }>(`${this.usersPath}Users/login?email=${email}&password=${password}`, {});
  }

}
