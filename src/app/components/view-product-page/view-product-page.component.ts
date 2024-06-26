import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { cartGet } from 'src/app/models/cartGet.model';
import { cartPost } from 'src/app/models/cartPost.model';
import { stockGet } from 'src/app/models/stockGet.model';
import { userGet } from 'src/app/models/userGet.model';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-view-product-page',
  templateUrl: './view-product-page.component.html',
  styleUrls: ['./view-product-page.component.css']
})
export class ViewProductPageComponent {

  product:stockGet={
    id:0,
    productName:'',
    brand:'',
    price:0,
    discount:0,
    quantity:0,
    type:'',
    status:'',
    img1:'',
    img2:'',
    img3:'',
    discription:''
  };

  user:userGet={
    id:0,
    fullName:'',
    email:'',
    passKey:'',
    phone:0,
    dateOfBirth:new Date(),
    address:'',
    role:''
  };

  cartData:cartPost={
    userId:0,
    productId:0,
    quantity:0,
    totalPrice:0
  };

  viewCart:cartGet[]=[];
  token:any;
  finalprice:number=0;
  productQuantity:number=1;
  metaData:string='data:image/jpeg;base64,';
  constructor(private service:StoreService,private route:ActivatedRoute,private router:Router,private toast:ToastrService){}


  ngOnInit(){
    this.route.paramMap.subscribe({
      next:(link)=>{
        const id=link.get('id');
        if(id){
          this.service.getProduct(id).subscribe({
            next:(data)=>{
              this.product=data;
              this.product.img1=this.metaData+this.product.img1;
              this.product.img2=this.metaData+this.product.img2;
              this.product.img3=this.metaData+this.product.img3;
            }
          })
        }
      }
    })
    this.token=this.service.decodedToken();
    const userId=this.token.id;
    if(userId){
      this.service.getUser(userId).subscribe({
        next:(data)=>{
          this.user=data;
        }
      })
    }
  }

  addCart(){
    this.cartData.userId=this.token.id;
    this.cartData.productId=this.product.id;
    this.cartData.quantity=this.productQuantity;
    this.cartData.totalPrice=this.productQuantity*((this.product.price-(this.product.price*(this.product.discount/100))));
    this.service.addCart(this.cartData).subscribe({
      next:(data)=>{
        console.log(data);
        this.toast.success("Item added to cart Successfully!!",'Success');
      },
      error:(err)=>{
        this.toast.error("Something went wrong!!",'Error');
      }
    })
  }

  buyNow(){
    this.addCart();
    this.service.viewCart().subscribe({
      next:(data)=>{
        this.viewCart=data;
        this.router.navigate(['cart',this.cartData.userId]);
      }
    })
  }

  calculatePrice(price:number,discount:number):string{
    this.finalprice=price-(price*(discount/100));
    return this.finalprice.toString();
  }
}
