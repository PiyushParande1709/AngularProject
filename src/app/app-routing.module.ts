import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { SignupPageComponent } from './components/signup-page/signup-page.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { DisplayUsersComponent } from './components/display-users/display-users.component';
import { AllProductsPageComponent } from './components/all-products-page/all-products-page.component';
import { AddProductPageComponent } from './components/add-product-page/add-product-page.component';
import { EditProductComponent } from './components/edit-product/edit-product.component';
import { ViewProductPageComponent } from './components/view-product-page/view-product-page.component';
import { CartPageComponent } from './components/cart-page/cart-page.component';
import { authGuard } from './guard/auth.guard';
import { roleGuard } from './guard/role.guard';
import { MyOrdersPageComponent } from './components/my-orders-page/my-orders-page.component';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import { AllOrderPageComponent } from './components/all-order-page/all-order-page.component';

const routes: Routes = [
  {path:'',component: HomePageComponent},
  {path:'login',component: LoginPageComponent},
  {path:'signup',component: SignupPageComponent},
  {path:'users',component: DisplayUsersComponent,canActivate:[roleGuard]},
  {path:'allProducts',component: AllProductsPageComponent,canActivate:[authGuard]},
  {path:'addProduct',component: AddProductPageComponent,canActivate:[roleGuard]},
  {path:'allProducts/productEdit/:id',component: EditProductComponent,canActivate:[roleGuard]},
  {path:'allProducts/product/:id',component:ViewProductPageComponent,canActivate:[authGuard]},
  {path:'cart/:id',component:CartPageComponent,canActivate:[authGuard]},
  {path:'orders',component:MyOrdersPageComponent,canActivate:[authGuard]},
  {path:'editUser',component:EditUserComponent,canActivate:[authGuard]},
  {path:'allOrder',component: AllOrderPageComponent,canActivate:[roleGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
