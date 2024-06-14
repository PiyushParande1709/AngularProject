import { ChangeDetectorRef, Component } from '@angular/core';
import { StoreService } from './services/store.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { userGet } from './models/userGet.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'StoreManagementUI';

  constructor(private router:Router,private cdr:ChangeDetectorRef,private toast:ToastrService,private service:StoreService){}
  role!:string;
  

  ngOnInit(){
    this.role=this.service.getRole();
    this.service.role$.subscribe((role)=>{
      this.role=role; //this sets the role in parent component.
      this.cdr.detectChanges(); // Manually trggering change detc. cycle to update view.
    })
    
  }

  signOut(){
    this.service.triggerLogout();
    this.cdr.detectChanges();       //It is used to manually trigger change detection.
    this.router.navigate(['login']);
    this.toast.info("You have been Signed Out Successfully!");
  }

  cart(){
    var token=this.service.decodedToken();
    const userId=token.id;
    this.router.navigate(['cart/'+userId]);
  }

}
