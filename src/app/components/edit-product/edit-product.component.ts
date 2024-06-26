import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { stockGet } from 'src/app/models/stockGet.model';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit{

  pid:string="";
  productForm!:FormGroup;
  currentData:stockGet={
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

  constructor(private service:StoreService,private fb:FormBuilder,private route:ActivatedRoute,private nav:Router,private toast:ToastrService){}
  
  
  ngOnInit(){
    this.route.paramMap.subscribe({
      next:(link)=>{
        const id = link.get('id');
        if(id){
          this.pid=id;
          this.service.getProduct(id).subscribe({
            next:(data)=>{
              this.currentData=data;
              this.initform();
            }})
        }
      }
    })
  }


  initform(){
    this.productForm=this.fb.group({
      id:[this.currentData.id],
      productName:[this.currentData.productName],
      brand:[this.currentData.brand],
      price:[this.currentData.price],
      discount:[this.currentData.discount],
      quantity:[this.currentData.quantity],
      type:[this.currentData.type],
      status:[this.currentData.status],
      img1:[this.currentData.img1],
      img2:[this.currentData.img2],
      img3:[this.currentData.img3],
      discription:[this.currentData.discription]
    })
  }

  onFileChange(event:any,imageField:string){
    const file=event.target.files[0];
    if(file){
      const reader=new FileReader();
      reader.onload=()=>{
        this.productForm.patchValue({
          [imageField]:reader.result?.toString().split(',')[1]// used to split the metadata of image
        });
        console.log(this.productForm.value);
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit(){
    this.service.updateProduct(this.pid,this.productForm.value)
    .subscribe({
      next:(data)=>{
        console.log(data);
        this.nav.navigate(['allProducts']);
        this.toast.info("Product Updated Successfully!!");
      }
    })
  }
  

}
