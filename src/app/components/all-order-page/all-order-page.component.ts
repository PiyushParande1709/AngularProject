import { ChangeDetectorRef, Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { orderGet } from 'src/app/models/orderGet.model';
import { orderPut } from 'src/app/models/orderPut.model';
import { stockGet } from 'src/app/models/stockGet.model';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-all-order-page',
  templateUrl: './all-order-page.component.html',
  styleUrls: ['./all-order-page.component.css']
})
export class AllOrderPageComponent {

  constructor(private service:StoreService,private toast:ToastrService){}
  orders:orderGet[]=[];
  status:string='';
  product!:stockGet;
  updatedProduct:orderPut={
    status:''
  };
  orderId:number=0;
  searchText:string='';

  loadData(){
    this.service.allOrder().subscribe({
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
            this.service.getUser(order.userId.toString()).subscribe({
              next:(data)=>{
                order.fullName=data.fullName;
                order.address=data.address;
              }
            })  
        });
      }
    })
  }

  ngOnInit(){
   this.loadData(); 
  }

  statusUpdate(productId:number,orderId:number,orderStatus:string){
    this.orderId=orderId;
    this.status=orderStatus;
    this.service.getProduct(productId.toString()).subscribe({
      next:(data)=>{
        this.product=data;
        console.log(this.product);
      }
    })
  }

  update(){
    this.updatedProduct.status=this.status;
    console.log(this.updatedProduct);
    this.service.updateOrder(this.orderId.toString(),this.updatedProduct).subscribe({
      next:(data)=>{
        this.toast.success("Status Updated Successfully!",'Success');
        this.loadData();
      }
    })
  }


}
