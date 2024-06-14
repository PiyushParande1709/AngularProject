import { Component } from '@angular/core';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.css']
})
export class SignupPageComponent {
  passType:string="password";
  icon:string="visibility_off";
  signupForm!:FormGroup;

  constructor(private form:FormBuilder,private service:StoreService,private router:Router){}

  ngOnInit(){
    this.signupForm=this.form.group({
      fullName:['',Validators.required],
      email:['',Validators.required],
      passKey:['',Validators.required],
      phone:[0||null,Validators.required],
      dateOfBirth:['',Validators.required],
      address:['',Validators.required],
      role:['USER']
    })
  }

  onSubmit(){
    console.log(this.signupForm.value);
    this.service.addUser(this.signupForm.value)
    .subscribe({
      next:(data)=>{
        console.log(data);
        this.signupForm.reset();
        this.router.navigate(['login']);
      }
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
