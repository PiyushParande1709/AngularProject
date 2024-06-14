import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { stockGet } from 'src/app/models/stockGet.model';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-all-products-page',
  templateUrl: './all-products-page.component.html',
  styleUrls: ['./all-products-page.component.css']
})
export class AllProductsPageComponent {
  products:stockGet[]=[];
  filtered:stockGet[]=[];
  role:string|null="";
  parentId:number=0;
  searchText:string='';
  Sneakers:boolean=false;
  Sports:boolean=false;
  Casuals:boolean=false;
  minPrice:number=50;
  maxPrice:number=50000;

  constructor(private service:StoreService,private toast:ToastrService){}

  storeId(id:number){
    this.parentId=id;
  }

  applyFilter(){
    this.filtered=[];
    for(let product of this.products){
      if(product.price>=this.minPrice && product.price<=this.maxPrice){
        if((this.Sneakers && product.type=='Sneakers')||(this.Casuals && product.type=='Casuals')||
         (this.Sports && product.type=='Sports'))
        {
          this.filtered.push(product);
        }
      }
      if(!this.Casuals && !this.Sneakers && !this.Sports){
        if(product.price>=this.minPrice && product.price<=this.maxPrice){
          this.filtered.push(product);
        }
      }
    }
    if(this.filtered.length==0){
      this.filtered=this.products;
      this.toast.error("No Products In The Desired Filter Range","No Product Found!")
    }
  }

  limitText(text:string,limit:number):string{
    if(!text) return '';
    const words=text.split(' ');
    if(words.length<=limit) return text;
    return words.slice(0,limit).join(' ')+'....';
 
  }
  deleteProduct(id:number){
    this.service.deleteProduct(id).subscribe({
      next:(data)=>{
        this.getProduct();
        this.toast.error("Product deleted Successfully!!","Deleted");
      },
      error:(err)=>{
        this.toast.error("Unable To Delete This Product");
      },
    })
  }

  getProduct(){
      this.service.allProducts()
      .subscribe({
        next:(data)=>{
          const tokenData=this.service.decodedToken();
          this.role=tokenData.role;
          this.products=data.map((product:stockGet)=>({  // Used to map a single product as data is a array.

            ...product,//Spread out operator
            img1:'data:image/jpeg;base64,'+product.img1, //It is used to indicate that the data that follows is base64 encoded jepg image.
            img2:'data:image/jpeg;base64,'+product.img2,
            img3:'data:image/jpeg;base64,'+product.img3
          }));
          this.filtered=this.products;
        },
      })
      
  }

  ngOnInit(){
    this.getProduct();
  }
}
