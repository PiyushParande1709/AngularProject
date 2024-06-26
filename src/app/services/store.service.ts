import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { userGet } from '../models/userGet.model';
import { stockGet } from '../models/stockGet.model';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  constructor(private http:HttpClient) { }

  decodedToken(){
    const jwtHelper =new JwtHelperService();//this object will help to decode the token.
    const token=localStorage.getItem('token')!;
    return jwtHelper.decodeToken(token);// returns the decoded token.
  }

  //BehaviourSubject stores the latest value it has emitted and emits this value to subscribers.
  private roleSubject=new BehaviorSubject<string>(this.getRole()); //intialize roleSubject with role stored in localStrorage.
  role$=this.roleSubject.asObservable(); //role$ observable other parts of app can subscribe to this

  triggerLogin(role:string){
    localStorage.setItem('role',role);
    this.roleSubject.next(role);//this updates the roleSubject with new role value, causing it to emit the new value to all subscribers. 
  }
  triggerLogout(){
    localStorage.removeItem('role');
    this.roleSubject.next('');//again updating the role value.
  }
  getRole():string{
    return localStorage.getItem('role')||'';//return null if no role found
  }




 //Api calling from backend
  addUser(user:any):Observable<any>{
    return this.http.post<any>('https://localhost:7292/StoreManagement/api/addUser',user);
  }

  editUser(id:string,data:any):Observable<any>{
    return this.http.put<any>('https://localhost:7292/StoreManagement/api/updateUser/'+id,data);
  }

  authUser(data:any):Observable<any>{
    return this.http.post<any>('https://localhost:7292/StoreManagement/api/authenticate',data);
  }

  getUser(id:string):Observable<any>{
    return this.http.get<any>('https://localhost:7292/StoreManagement/api/userById/'+id);
  }

  deleteUser(id:string):Observable<any>{
    return this.http.delete<any>('https://localhost:7292/StoreManagement/api/delete/'+id)
  }

  allUsers(): Observable<userGet[]>{
    return this.http.get<userGet[]>('https://localhost:7292/StoreManagement/api/users');
  }

  allProducts():Observable<any>{
    return this.http.get<any>('https://localhost:7292/StoreManagement/api/stocks');
  }

  addProduct(data:any):Observable<any>{
    return this.http.post<any>('https://localhost:7292/StoreManagement/api/addStock',data);
  }

  getProduct(id:string):Observable<stockGet>{
    return this.http.get<stockGet>('https://localhost:7292/StoreManagement/api/StockById/'+id);
  }

  updateProduct(id:string,data:any):Observable<stockGet>{
    return this.http.put<any>('https://localhost:7292/StoreManagement/api/updateStock/'+id,data);
  }

  deleteProduct(id:number):Observable<any>{
    return this.http.delete<any>('https://localhost:7292/StoreManagement/api/deleteStock/'+id)
  }

  addCart(data:any):Observable<any>{
    return this.http.post<any>('https://localhost:7292/StoreManagement/api/addCart',data);
  }
  viewCart():Observable<any[]>{
    return this.http.get<any[]>('https://localhost:7292/StoreManagement/api/getAllCart');
  }

  getCart(id:string):Observable<any>{
    return this.http.get<any[]>('https://localhost:7292/StoreManagement/api/cart/'+id);
  }

  removeCart(id:number):Observable<any>{
    return this.http.delete<any>('https://localhost:7292/StoreManagement/api/deleteCart/'+id);
  }

  placeOrder(data:any):Observable<string>{
    return this.http.post<string>('https://localhost:7292/StoreManagement/api/order',data);
  }

  getOrder(id:string):Observable<any[]>{
    return this.http.get<any[]>('https://localhost:7292/StoreManagement/api/orders/'+id);
  }

  allOrder():Observable<any[]>{
    return this.http.get<any[]>('https://localhost:7292/StoreManagement/api/allOrder');
  }

  updateOrder(id:string,data:any):Observable<any>{
    return this.http.put<any>('https://localhost:7292/StoreManagement/api/order/'+id,data);
  }

}
