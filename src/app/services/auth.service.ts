import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { registeredUser,loginUser } from '../interfaces/auth';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // private baseUrl = 'https://localhost:7265/api';
  private baseUrl='http://s-detailportal.somee.com/api'
  constructor(private http: HttpClient) { }
  registerUser(User:registeredUser){
    return this.http.post(`${this.baseUrl}/users`,User);
  }
  loginUser(User:loginUser){
    return this.http.post(`${this.baseUrl}/users/login`,User);
  }
  getCount(){
    return this.http.get(`${this.baseUrl}/users/students/count`);
  }
}
