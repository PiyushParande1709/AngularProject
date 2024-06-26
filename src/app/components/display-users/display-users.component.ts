import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { orderGet } from 'src/app/models/orderGet.model';
import { userGet } from 'src/app/models/userGet.model';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-display-users',
  templateUrl: './display-users.component.html',
  styleUrls: ['./display-users.component.css']
})
export class DisplayUsersComponent {  
  user:userGet[]=[];
  orders:orderGet[]=[];
  strId:number=0;
  constructor(private service:StoreService,private toast:ToastrService){}
  
  ngOnInit(){
    this.service.allUsers()
    .subscribe({
      next:(data)=>{
        this.user=data;
      }
    })
  }

  storeId(id:number){
    this.strId=id;
  }

  order(id:number){
    this.service.getOrder(id.toString()).subscribe({
      next:(data)=>{
        this.orders=data;
        this.orders.forEach(order => {
            this.service.getProduct(order.productId.toString()).subscribe({
              next:(data)=>{
                console.log(data);
                order.productName=data.productName;
                order.brand=data.brand;
                order.discount=data.discount;
                order.discription=data.discription;
                order.img1=data.img1;
              }
            })  
        });
        console.log(this.orders);
      }
      
    })
  }

  delete(){
    this.service.deleteUser(this.strId.toString()).subscribe({
      next:(data)=>{
        this.toast.success("User Deactivated Successfully!");
      },
      error:(err)=> {
        this.toast.error("Something Went Wrong!");
      }
    })
  }

}
