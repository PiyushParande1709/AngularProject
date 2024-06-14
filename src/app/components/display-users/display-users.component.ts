import { Component } from '@angular/core';
import { userGet } from 'src/app/models/userGet.model';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-display-users',
  templateUrl: './display-users.component.html',
  styleUrls: ['./display-users.component.css']
})
export class DisplayUsersComponent {  
  user:userGet[]=[];

  constructor(private service:StoreService){}
  
  ngOnInit(){
    this.service.allUsers()
    .subscribe({
      next:(data)=>{
        this.user=data;
      }
    })
  }

}
