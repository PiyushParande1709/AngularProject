import { ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { cartGet } from 'src/app/models/cartGet.model';
import { cartPost } from 'src/app/models/cartPost.model';
import { orderPost } from 'src/app/models/orderPost.model';
import { userGet } from 'src/app/models/userGet.model';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css']
})
export class CartPageComponent {

  carts:cartGet[]=[];
  finalPrice:number=0;
  productId!:number;
  userId:string='';
  user:userGet={
    id:0,
    fullName:"",
    email:'',
    passKey:'',
    phone:0,
    dateOfBirth:new Date(),
    address:'',
    role:''
  }
  order:orderPost={
    userId:0,
    productId:0,
    quantity:0,
    totalPrice:0,
    status:'RECIVED',
    orderNumber:''
  }
 

  constructor(private service: StoreService,private route:ActivatedRoute,private toast:ToastrService,private router:Router){}

  ngOnInit(){
    this.route.paramMap.subscribe({
      next:(link)=>{
        this.userId=link.get('id')!;
        if(this.userId){
          this.service.getCart(this.userId).subscribe({
            next:(data)=>{
              this.carts=data;
              console.log(this.carts);
              this.finalPrice=0;
              this.carts.forEach(item => {
                this.finalPrice+=item.totalPrice;
              });
            }
          })
          this.service.getUser(this.userId).subscribe({
            next:(data)=>{
              this.user=data;
            }
          })
        }
      }
    })
  }

  storeId(id:number){
    this.productId=id;
  }
  removeItem(){
    this.service.removeCart(this.productId).subscribe({
      next:(res)=>{
        this.service.getCart(this.userId).subscribe({
          next:(data)=>{
            this.carts=data;
            this.finalPrice=0;
            this.carts.forEach(item => {
              this.finalPrice+=item.totalPrice;
            });
          }
        })
        
        this.toast.success("Product Removed From The Cart!!",'Success');
      },
      error:(err)=>{
        this.toast.error("Something Went Wrong!",'Error');
      }
    })
  }

  getRandomChars(source:string,length:number):string{
    let result='';
    for(let i=0;i<length;i++){
      const randomIndex=Math.floor(Math.random()*source.length); //((0-1),0.5  * 26)
      result+=source[randomIndex];
    }
    return result;
  }

  generateOrderNum():string{
    const letters='ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const digits='0123456789';

    const part1=this.getRandomChars(letters,3);
    const part2=this.getRandomChars(letters,3);
    const part3=this.getRandomChars(letters,1)+this.getRandomChars(digits,1);
    
    return (part1+"-"+part2+"-"+part3);
  }

  placeOrder(){    
    this.carts.forEach(item => {
      this.order.userId=item.userId;
      this.order.orderNumber=this.generateOrderNum();
      this.order.productId=item.productId;
      this.order.quantity=item.quantity;
      this.order.totalPrice=item.totalPrice;

      this.service.placeOrder(this.order).subscribe({
        next:(data)=>{
          console.log(data);
          this.service.removeCart(item.id).subscribe({
            next:(data)=>{
              console.log(data);
            }
          })
        }
      })
    });
    this.toast.success("Order Placed Successfully!!",'Congratulations');
    this.router.navigate(['orders']);
  }

}
