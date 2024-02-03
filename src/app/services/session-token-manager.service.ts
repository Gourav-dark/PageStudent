import { Token } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class SessionTokenManagerService {
  constructor() { }
  // decoded:any;
  // Token:string|undefined;
  getToken():any{
    return sessionStorage.getItem('userDetailToken');
  }
  setToken(token:string){
    sessionStorage.setItem('userDetailToken',token);
  }
  removeToken(){
    sessionStorage.removeItem('userDetailToken');
  }
  JwtTokenData(){
    const Token:any=sessionStorage.getItem('userDetailToken');
    const decoded:any= jwtDecode(Token);
    return decoded;
  }

}
