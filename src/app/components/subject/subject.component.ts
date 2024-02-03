import { Component, inject } from '@angular/core';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { subject } from '../../interfaces/common';
import { DeletePopupComponent } from '../delete-popup/delete-popup.component';
import { ToastsVariableService } from '../../shared/toasts-variable.service';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-subject',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,DeletePopupComponent,NgxPaginationModule],
  templateUrl: './subject.component.html',
  styleUrl: './subject.component.css'
})
export class SubjectComponent {
  private userService=inject(UserService);
  private fb=inject(FormBuilder);
  private toastVariable=inject(ToastsVariableService);
  ModalOption="Create New";

  subjectList:any=[];
  ngOnInit(): void{
    this.userService.getAllSubject().subscribe(
      (response:any)=>{
        // console.log(response);
        this.subjectList=response;
        this.subjectList.sort((a:any, b:any) => a.s_Name.localeCompare(b.s_Name));
        // console.log(this.subjectllist);
      },error=>{
        // console.log(error);
        this.toastVariable.message=error.error.message;
        this.toastVariable.appear=true;
        this.toastVariable.type="bg-red-500";
        this.toastVariable.closeTimeToast();
      }
    );
  }
  //delete model call code
  deleteModel = false;
  subId:number=0;
  conformationFun(data: boolean): void {
    if (data) {
      this.userService.deleteSubjectRequest(this.subId).subscribe(
        (response: any) => {
          // console.log(response);
          this.toastVariable.message=response.message;
          this.toastVariable.appear=true;
          this.toastVariable.type="bg-red-500";
          this.toastVariable.closeTimeToast();
          this.ngOnInit();
        },
        (error: any) => {
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
  deleteSubject(sId: number): void {
    this.deleteModel = true;
    this.subId=sId;
  }
  modelDeleteClose(){
    this.deleteModel=false;
  }
  //Add and Edit Subject Code
  //model for form
  modalOpen: boolean = false;
  IsEdit:boolean=false;
  toggleModal() {
    this.modalOpen = !this.modalOpen;
    this.subjectForm.patchValue({
      s_Name:"",
      s_Code:""
    });
    this.IsEdit=false;
    this.ModalOption="Create New";
  }

  subjectForm=this.fb.group({
    s_Name:['', [Validators.required]],
    s_Code:['', [Validators.required]]
  });
  get s_Name(){
    return this.subjectForm.controls['s_Name'];
  }
  get s_Code(){
    return this.subjectForm.controls['s_Code'];
  }
  insertSubject(){
    if(this.IsEdit){
      this.userService.updateSubjectRequest(this.subId as number,this.subjectForm.value as subject).subscribe(
        (response:any)=>{
          // console.log(response);
          this.toggleModal();
          this.toastVariable.message=response.message;
          this.toastVariable.appear=true;
          this.toastVariable.type="bg-green-500";
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
    }else{
      this.userService.insertSubjectRequest(this.subjectForm.value as subject).subscribe(
        (response:any)=>{
          // console.log(response);
          this.toastVariable.message=response.message;
          this.toastVariable.appear=true;
          this.toastVariable.type="bg-green-500";
          this.toastVariable.closeTimeToast();
          this.toggleModal();
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
  }
  updateSubject(data:subject){
    this.subjectForm.patchValue({
      s_Name:data.s_Name,
      s_Code:data.s_Code
    });
    this.subId=data.id;
    this.modalOpen=true;
    this.IsEdit=true;
    this.ModalOption="Update";
  }
  //For Pagination using ngx-pagination
  index=1;
  pageSize=14;
  currentPage=1;
}
