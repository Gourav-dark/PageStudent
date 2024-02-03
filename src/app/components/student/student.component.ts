import { Component, inject } from '@angular/core';
import { UserService } from '../../services/user.service';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DeletePopupComponent } from '../delete-popup/delete-popup.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { ToastsVariableService } from '../../shared/toasts-variable.service';

@Component({
  selector: 'app-student',
  standalone: true,
  imports: [RouterLink,CommonModule,DeletePopupComponent,NgxPaginationModule],
  templateUrl: './student.component.html',
  styleUrl: './student.component.css'
})
export class StudentComponent {
  private userService=inject(UserService);
  private toastVariable=inject(ToastsVariableService);
  studentList:any=[];
  ngOnInit(): void{
    this.userService.getAllStudentRequest().subscribe(
      (response:any)=>{
        // console.log(response);
        this.studentList=response;
        // this.studentList=this.studentList+response+response;
        // console.log(this.studentList);
        // this.studentList.sort((a:any, b:any) => a.name.localeCompare(b.name));
      },error=>{
        // console.log(error);
        this.toastVariable.message=error.error.message;
        this.toastVariable.appear=true;
        this.toastVariable.type="bg-red-500";
        this.toastVariable.closeTimeToast();
      }
    );
  }
  //delete model code
  deleteModel = false;
  stId:string='';
  conformationFun(data: boolean): void {
    if (data) {
      this.userService.deleteStudentRequest(this.stId).subscribe(
        (response:any)=>{
          // console.log(response);
          this.toastVariable.message=response.message;
          this.toastVariable.appear=true;
          this.toastVariable.type="bg-red-500";
          this.toastVariable.closeTimeToast();
          this.ngOnInit();
        },error=>{
          // console.log(error);
          this.toastVariable.message=error.error.message;
          this.toastVariable.appear=true;
          this.toastVariable.type="bg-red-500";
          this.toastVariable.closeTimeToast();
        }
      );
    }
    this.deleteModel = false;
  }
  deleteStudent(sId:string){
    this.deleteModel = true;
    this.stId=sId;
  }
  //For Pagination using ngx-pagination
  pageSize=14;
  currentPage=1;
  index=1;
}
