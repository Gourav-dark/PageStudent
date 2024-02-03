import { Component,OnInit,inject } from '@angular/core';
import { loggedUser } from '../../interfaces/auth';
import { UserService } from '../../services/user.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ToastsVariableService } from '../../shared/toasts-variable.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  private fb=inject(FormBuilder);
  private userService=inject(UserService);
  private activatedRoute=inject(ActivatedRoute);
  private toastVariable=inject(ToastsVariableService);

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
  userId=this.activatedRoute.snapshot.paramMap.get("userId");

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
      },error=>{
        console.log(error);
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
}
