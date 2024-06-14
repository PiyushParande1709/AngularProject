import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { userGet } from 'src/app/models/userGet.model';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent {

  constructor(private service:StoreService,private fb:FormBuilder,private toast:ToastrService){}
  
  userForm:FormGroup=new FormGroup({
    Id:new FormControl(),
    fullName: new FormControl(),
    email:new FormControl(),
    passKey:new FormControl(),
    phone:new FormControl(),
    dateOfBirth:new FormControl(),
    address:new FormControl(),
    role:new FormControl(),
  });
  oldPass:string='';
  newPass:string='';
  rePass:string='';
  userId:string='';

  userData!:userGet;

  ngOnInit(){
    const token=this.service.decodedToken();
    this.userId=token.id;
      if(this.userId){
        this.service.getUser(this.userId).subscribe({
          next:(data)=>{
            this.userData=data;
            this.userForm=this.fb.group({
              Id:[data.Id],
              fullName:[data.fullName,Validators.required],
              email:[data.email,Validators.required],
              passKey:[data.passKey,Validators.required],
              phone:[data.phone,Validators.required],
              dateOfBirth:[data.dateOfBirth,Validators.required],
              address:[data.address,Validators.required],
              role:[data.role,Validators.required],
            })
          }
          })
      }
  }

  editUser(){
    this.service.editUser(this.userId,this.userForm.value).subscribe({
      next:(data)=>{
        this.toast.success("Profile Updated Successfully!","Profile Updated");
      }
    })
  }

  passwordUpdate(){
    console.log(this.oldPass+" | "+this.userData.passKey+" | "+this.newPass+" | "+this.rePass);
    if(this.oldPass==this.userData.passKey){
      if(this.newPass==this.rePass){
        this.userData.passKey=this.newPass;
        this.service.editUser(this.userId,this.userData).subscribe({
          next:(data)=>{
            this.toast.success("Password Updated Successfully!","Password Updated");
          }
        })
      }
      else{
        this.toast.error("New Password is Not Matching!!","Password");
      }
    }
    else{
      this.toast.error("Old Password is Wrong!!","Password");
    }
  }
}
