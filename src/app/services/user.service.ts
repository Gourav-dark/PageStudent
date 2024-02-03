import { HttpClient } from '@angular/common/http';
import { Injectable,inject } from '@angular/core';
import { SessionTokenManagerService } from './session-token-manager.service';
import { loggedUser } from '../interfaces/auth';
import { marks, subject } from '../interfaces/common';
// import { jwtDecode } from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  // private baseUrl = 'https://localhost:7265/api';
  private baseUrl='http://s-detailportal.somee.com/api'
  private session=inject(SessionTokenManagerService);
  constructor(private http: HttpClient) {
    // const decode=jwtDecode(this.session.getToken());
    // console.log(decode);
  }
  loginUser(UserId:string){
    return this.http.get<loggedUser>(`${this.baseUrl}/users/${UserId}`,{headers:{ 'Authorization': `Bearer ${this.session.getToken()}`}});
  }
  UpdatedUser(UserId:string,User:loggedUser){
    return this.http.put(`${this.baseUrl}/users/${UserId}`,User,{headers:{ 'Authorization': `Bearer ${this.session.getToken()}`}});
  }
  updateProfileImage(UserId:string,Image:FormData){
    return this.http.put(`${this.baseUrl}/users?id=${UserId}`,Image,
    {
      headers:{
        'Authorization': `Bearer ${this.session.getToken()}`
      }
    });
  }
  //Get All Student Request
  getAllStudentRequest(){
    return this.http.get(`${this.baseUrl}/users/students`,{headers:{ 'Authorization': `Bearer ${this.session.getToken()}`}});
  }
  deleteStudentRequest(stId:string){
    return this.http.delete(`${this.baseUrl}/users/${stId}`,{headers:{ 'Authorization': `Bearer ${this.session.getToken()}`}});
  }
  //Subject Request
  getAllSubject(){
    return this.http.get(`${this.baseUrl}/subjects`,{headers:{ 'Authorization': `Bearer ${this.session.getToken()}`}});
  }
  insertSubjectRequest(subject:subject){
    return this.http.post(`${this.baseUrl}/subjects`,subject,{headers:{ 'Authorization': `Bearer ${this.session.getToken()}`}});
  }
  updateSubjectRequest(subId:number,subject:subject){
    return this.http.put(`${this.baseUrl}/subjects/${subId}`,subject,{headers:{ 'Authorization': `Bearer ${this.session.getToken()}`}});
  }
  deleteSubjectRequest(subId:number){
    return this.http.delete(`${this.baseUrl}/subjects/${subId}`,{headers:{ 'Authorization': `Bearer ${this.session.getToken()}`}});
  }
  getSubjectById(subId:number){
    return this.http.get(`${this.baseUrl}/subjects/${subId}`,{headers:{ 'Authorization': `Bearer ${this.session.getToken()}`}});
  }
  //Grades
  getGradeId(marks:number){
    return this.http.get(`${this.baseUrl}/grades/marks/${marks}`);
  }
  //marks
  insertMarksRequest(data:marks){
    return this.http.post(`${this.baseUrl}/marks`,data,{headers:{ 'Authorization': `Bearer ${this.session.getToken()}`}});
  }
  getStudentMarksList(stId:string){
    return this.http.get(`${this.baseUrl}/marks/student/${stId}`,{headers:{ 'Authorization': `Bearer ${this.session.getToken()}`}});
  }
  deleteMarks(stId:string,subId:number){
    return this.http.delete(`${this.baseUrl}/marks/${stId}/${subId}`,{headers:{ 'Authorization': `Bearer ${this.session.getToken()}`}});
  }
}
