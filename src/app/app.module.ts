import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { SignupPageComponent } from './components/signup-page/signup-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatIconModule} from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgToastModule } from 'ng-angular-popup';
import { DisplayUsersComponent } from './components/display-users/display-users.component';
import { AllProductsPageComponent } from './components/all-products-page/all-products-page.component';
import { AddProductPageComponent } from './components/add-product-page/add-product-page.component';
import { EditProductComponent } from './components/edit-product/edit-product.component';
import { ViewProductPageComponent } from './components/view-product-page/view-product-page.component';
import { CartPageComponent } from './components/cart-page/cart-page.component';
import { ToastrModule } from 'ngx-toastr';
import { MyOrdersPageComponent } from './components/my-orders-page/my-orders-page.component';
import { ProductFilterPipe } from './pipe/product-filter.pipe';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import { AllOrderPageComponent } from './components/all-order-page/all-order-page.component';
import { OrderFilterPipe } from './pipe/order-filter.pipe';




@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    LoginPageComponent,
    SignupPageComponent,
    DisplayUsersComponent,
    AllProductsPageComponent,
    AddProductPageComponent,
    EditProductComponent,
    ViewProductPageComponent,
    CartPageComponent,
    MyOrdersPageComponent,
    ProductFilterPipe,
    EditUserComponent,
    AllOrderPageComponent,
    OrderFilterPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgToastModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut:3000,
      positionClass:'toast-bottom-right',
      preventDuplicates:true
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
