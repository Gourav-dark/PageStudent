import { Component,inject } from '@angular/core';
import { FormBuilder,ReactiveFormsModule,Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { passwordMatchValidator } from '../../shared/password-match.directive';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { registeredUser } from '../../interfaces/auth';
import { SessionTokenManagerService } from '../../services/session-token-manager.service';
import { ToastsVariableService } from '../../shared/toasts-variable.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule,RouterLink,CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  private fb=inject(FormBuilder);
  private authService=inject(AuthService);
  private session=inject(SessionTokenManagerService);
  private router=inject(Router);
  private toastVariable=inject(ToastsVariableService);
  
  passtype:string="password";
  passicon:string="pi-eye-slash";
  copasstype:string="password";
  copassicon:string="pi-eye-slash";

  registerForm = this.fb.group({
    name: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]+(?: [a-zA-Z]+)*$/)]],
    email: ['', [Validators.required, Validators.email]],
    age:[0,Validators.required],
    address:['',Validators.required],
    phone:['',[Validators.required, Validators.pattern("[0-9]{10}")]],
    password: ['', Validators.required],
    confirmPassword: ['', Validators.required],
    roleId:[2]
  }, {
    validators: passwordMatchValidator
  })
  get name() {
    return this.registerForm.controls['name'];
  }
  get email() {
    return this.registerForm.controls['email'];
  }
  get age(){
    return this.registerForm.controls['age'];
  }
  get address(){
    return this.registerForm.controls['address'];
  }
  get phone(){
    return this.registerForm.controls['phone'];
  }
  get password() {
    return this.registerForm.controls['password'];
  }
  get confirmPassword() {
    return this.registerForm.controls['confirmPassword'];
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
  ChangeTypeco(){
    if(this.copasstype=="text"){
      this.copassicon="pi-eye-slash";
      this.copasstype="password";
    }else{
      this.copasstype="text";
      this.copassicon="pi-eye";
    }
  }
  // Submit button response
  registerUser(){
    const postData={...this.registerForm.value };
    delete postData.confirmPassword;
    // console.log(postData);
    this.authService.registerUser( postData as registeredUser).subscribe(
      (response:any)=>{
        // console.log(response);
        this.session.removeToken();
        this.session.setToken(response.token);
        this.toastVariable.message=response.message;
        this.toastVariable.appear=true;
        this.toastVariable.type="bg-green-500";
        this.toastVariable.closeTimeToast();
        this.router.navigate([`student-profile/${this.session.JwtTokenData().userId}`]);
      },error=>{
        // console.log(error);
        this.toastVariable.message=error.error.message;
        this.toastVariable.appear=true;
        this.toastVariable.type="bg-red-500";
        this.toastVariable.closeTimeToast();
      }
    );
  }
  ngOnInit():void{
    this.session.removeToken();
  }
}
