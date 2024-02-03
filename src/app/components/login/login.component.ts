import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder,ReactiveFormsModule,Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { loginUser } from '../../interfaces/auth';
import { SessionTokenManagerService } from '../../services/session-token-manager.service';
import { ToastsVariableService } from '../../shared/toasts-variable.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink,ReactiveFormsModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  private fb=inject(FormBuilder);
  private router=inject(Router);
  private authService=inject(AuthService);
  private session=inject(SessionTokenManagerService);
  private toastVariable=inject(ToastsVariableService);

  passtype:string="password";
  passicon:string="pi-eye-slash";

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  })
  get email() {
    return this.loginForm.controls['email'];
  }
  get password() { return this.loginForm.controls['password']; }
  ChangeType(){
    if(this.passtype=="text"){
      this.passicon="pi-eye-slash";
      this.passtype="password";
    }else{
      this.passtype="text";
      this.passicon="pi-eye";
    }
  }
  loginUser() {
    // const { email, password } = this.loginForm.value;
    this.authService.loginUser(this.loginForm.value as loginUser).subscribe(
      (response:any)=>{
        // console.log(response.token);
        this.session.removeToken();
        this.session.setToken(response.token);
        this.toastVariable.message=response.message;
        this.toastVariable.appear=true;
        this.toastVariable.type="bg-green-500";
        this.toastVariable.closeTimeToast();
        if(this.session.JwtTokenData().roleName==="Student"){
          this.router.navigate([`student-profile/${this.session.JwtTokenData().userId}`]);
        }else{
          this.router.navigate([`profile/${this.session.JwtTokenData().userId}`]);
        }
      },error=>{
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