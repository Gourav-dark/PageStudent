import { Component, inject } from '@angular/core';
import { loggedUser } from '../../interfaces/auth';
import { UserService } from '../../services/user.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { SessionTokenManagerService } from '../../services/session-token-manager.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { marks, subject } from '../../interfaces/common';
import { ToastsVariableService } from '../../shared/toasts-variable.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { DeletePopupComponent } from '../delete-popup/delete-popup.component';

@Component({
  selector: 'app-studentprofile',
  standalone: true,
  imports: [RouterLink,CommonModule,ReactiveFormsModule,NgxPaginationModule,DeletePopupComponent],
  templateUrl: './studentprofile.component.html',
  styleUrl: './studentprofile.component.css'
})
export class StudentprofileComponent {
  private fb=inject(FormBuilder);
  private userService=inject(UserService);
  private activatedRoute=inject(ActivatedRoute);
  private toastVariable=inject(ToastsVariableService);
  session=inject(SessionTokenManagerService);
  profileImage:string="";
  userId=this.activatedRoute.snapshot.paramMap.get("stId");
  grade:any;

  subjectList:any|subject=[];
  markList:any=[];
  //profile show And Update
  private User:loggedUser | any;
  passtype:string="password";
  passicon:string="pi-eye-slash";
  editProfileForm:FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]+(?: [a-zA-Z]+)*$/)]],
    email: [''],
    age:[0,Validators.required],
    address:['',Validators.required],
    phone:['',[Validators.required, Validators.pattern("[0-9]{10}")]],
    password: ['123', Validators.required]
  });
  get name() {
    return this.editProfileForm.controls['name'];
  }
  get age(){
    return this.editProfileForm.controls['age'];
  }
  get address(){
    return this.editProfileForm.controls['address'];
  }
  get phone(){
    return this.editProfileForm.controls['phone'];
  }
  get password() {
    return this.editProfileForm.controls['password'];
  }
  ChangeType(){
    if(this.passtype=="text"){
      this.passicon="pi-eye-slash";
      this.passtype="password";
    }else{
      this.passtype="text";
      this.passicon="pi-eye";
    }
  }
  ngOnInit(): void{
    this.userService.loginUser(this.userId as string).subscribe(
      (response:any)=>{
        // console.log(response);
        this.User={ ...response};
        // console.log(this.User);
        this.editProfileForm.patchValue({
          name:this.User.name,
          email:this.User.email,
          age:this.User.age,
          phone:this.User.phone,
          address:this.User.address,
          password:this.User.password
        });
        this.profileImage=response.imageUrl;
      },error=>{
        // console.log(error);
      }
    );
    this.userService.getStudentMarksList(this.userId as string).subscribe(
      (response:any)=>{
        // console.log(response)
        this.markList=response;
        this.markList.sort((a:any, b:any) => a.subjectName.localeCompare(b.subjectName));
      },error=>{
        // console.log(error);
      }
    );
  }
  //Update btn code
  updateUser(){
    this.userService.UpdatedUser(this.userId as string,this.editProfileForm.value as loggedUser).subscribe(
      (response:any)=>{
        // console.log(response);
        this.toastVariable.message=response.message;
        this.toastVariable.appear=true;
        this.toastVariable.type="bg-green-500";
        this.toastVariable.closeTimeToast();
      },error=>{
        // console.log(error);
        this.toastVariable.message=error.error.message;
        this.toastVariable.appear=true;
        this.toastVariable.type="bg-red-500";
        this.toastVariable.closeTimeToast();
      });
  }
  //Insert Mark Form
  marksForm = this.fb.group({
    obtainedMarks:[null,[Validators.required, Validators.pattern("([0-9]|[1-9][0-9]|100)$")]],
    subjectId:[null,Validators.required]
  });
  get obtainedMarks(){
    return this.marksForm.controls['obtainedMarks'];
  }
  get subjectId(){
    return this.marksForm.controls['subjectId'];
  }
  insertMarks(){
    const obtainedMarks:number=this.marksForm.value.obtainedMarks ?? 0;
    const subjectId:number=this.marksForm.value.subjectId ?? 0;
    const studentId:string=this.userId ?? "";
    this.userService.getGradeId(obtainedMarks as number).subscribe(
      (response:any)=>{
        // console.log(response);
        this.grade=response;
        // console.log(this.grade);
        const Markobj:marks={
          obtainedMarks:obtainedMarks,
          studentId:studentId,
          subjectId:subjectId,
          gradeId:this.grade.id
        }
        this.userService.insertMarksRequest(Markobj).subscribe(
          (response:any)=>{
            // console.log(response);
            this.modalforMark=false;
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
          });
      },error=>{
        // console.log(error);
      }
    );
  };
  modalforMark=false;
  toggleMarkModal(){
    this.userService.getAllSubject().subscribe(
      (response:any)=>{
        // console.log(response);
        this.subjectList=response;
        // console.log(this.subjectList);
      },error=>{
        // console.log(error);
      }
    );
    this.modalforMark=!this.modalforMark;
    this.marksForm.patchValue({
      obtainedMarks:null,
      subjectId:null
    });
  }
  //delete model code
  deleteModel = false;
  stId:string='';
  subId:number=0;
  conformationFun(data: boolean): void {
    if (data) {
      this.userService.deleteMarks(this.stId,this.subId).subscribe(
        (response:any)=>{
          // console.log(response);
          this.ngOnInit();
          this.toastVariable.message=response.message;
          this.toastVariable.appear=true;
          this.toastVariable.type="bg-red-500";
          this.toastVariable.closeTimeToast();
        },error=>{
          // console.log(error);
          // this.ngOnInit();
        }
      );
    }
    this.deleteModel = false;
  }
  //Delete Marks
  deleteMark(sId:string,suId:number){
    console.log(sId+" "+suId);
    this.deleteModel = true;
    this.stId=sId;
    this.subId=suId;
  }
  //Image change function
  // formData = new FormData();
  ImageFile:any;
  imageModel=false;
  imageUrl:any;
  imageModeltoggle(){
    this.imageModel=!this.imageModel;
  }
  changeImageFunction(){
    if(this.ImageFile){
      const formData = new FormData();
      formData.append("File",this.ImageFile);
      this.userService.updateProfileImage(this.userId as string,formData).subscribe(
        (response:any)=>{
          this.toastVariable.message=response.message;
          this.toastVariable.appear=true;
          this.toastVariable.type="bg-green-500";
          this.toastVariable.closeTimeToast();
          this.ngOnInit();
          // console.log(response);
        },error=>{
            // console.log(error);
            this.toastVariable.message=error.error.message;
            this.toastVariable.appear=true;
            this.toastVariable.type="bg-red-500";
            this.toastVariable.closeTimeToast();
        }
      );
    }
    this.imageUrl=null;
    // this.ImageFile=null;
    this.imageModeltoggle();
  }
  selectFile(event: any) {
    this.ImageFile=event.target.files[0];
		var reader = new FileReader();
		reader.readAsDataURL(event.target.files[0]);		
		reader.onload = (_event) => {
			this.imageUrl = reader.result; 
		}
	}
  //For Pagination using ngx-pagination
  pageSize=3;
  currentPage=1;
  index=1;
}
