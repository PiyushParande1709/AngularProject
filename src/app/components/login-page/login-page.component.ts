import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { ToastrService } from 'ngx-toastr';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})

export class LoginPageComponent {
  passType:string="password";
  icon:string="visibility_off";
  loginForm!:FormGroup;
  tok:string="";

  constructor(private form:FormBuilder, private service: StoreService,private router:Router,private toast:ToastrService){}

  ngOnInit():void{
    this.loginForm=this.form.group({
      email:['',Validators.required],
      passKey:['',Validators.required],
    })
  }


  onSubmit(){
    this.service.authUser(this.loginForm.value)
    .subscribe({
      next:(data)=>{
          this.loginForm.reset();
          window.localStorage.setItem("token",data.token);
          var token=this.service.decodedToken();
          this.service.triggerLogin(token.role);//this will set the role in localStorage
          if(token.role=='ADMIN'){
            this.router.navigate(['users']);
            this.toast.success("Admin Login successfull!!",'Success');
          }
          else this.router.navigate(['allProducts']);
          this.toast.success("User Login successfull!!",'Success');
      },
      error:(err)=>{
        console.log(err);
        this.toast.error("Invalid Username Or Password!!",'Error');
      },
    })
  }

  showPass(){
    if(this.passType=="password"){
      this.passType="text";
      this.icon="remove_red_eye";
    }
    else{
      this.passType="password";
      this.icon="visibility_off";
    } 
  }
}
