import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-add-product-page',
  templateUrl: './add-product-page.component.html',
  styleUrls: ['./add-product-page.component.css']
})
export class AddProductPageComponent {

  constructor(private service:StoreService,private form:FormBuilder,private router:Router,private toast:ToastrService){}

  productForm!:FormGroup;

  ngOnInit(){
    this.productForm=this.form.group({
      productName:['',Validators.required],
      brand:['',Validators.required],
      price:[0||null,Validators.required],
      discount:[0||null,Validators.required],
      quantity:[0||null,Validators.required],
      type:['Sneakers',Validators.required],
      status:['ACTIVE',Validators.required],
      img1:[''],
      img2:[''],
      img3:[''],
      discription:['',Validators.required]
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
    this.service.addProduct(this.productForm.value)
    .subscribe({
      next:(data)=>{
        console.log(data);
        this.router.navigate(['/allProducts']);
        this.toast.info("Product Added Successfully!")
      }
    })
  }
  
}
