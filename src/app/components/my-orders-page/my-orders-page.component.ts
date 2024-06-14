import { Component } from '@angular/core';
import { orderGet } from 'src/app/models/orderGet.model';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-my-orders-page',
  templateUrl: './my-orders-page.component.html',
  styleUrls: ['./my-orders-page.component.css']
})
export class MyOrdersPageComponent {

  orders:orderGet[]=[];

  constructor(private service:StoreService){}

  ngOnInit(){
    const token=this.service.decodedToken();
    const userId=token.id;
    console.log(userId);

    this.service.getOrder(userId).subscribe({
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

        
      }
    })
    
  }
}
