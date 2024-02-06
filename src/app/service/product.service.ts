import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { productData } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  getProduct(){
    var api = 'http://localhost:3000/api/product'
    return this.http.get(api);
  }

  orders(userid:any){
    var api = 'http://localhost:3000/api/createOrders'
    return this.http.post<any>(api, {userid:userid});
  }

  cart(userid: any){
    var api = 'http://localhost:3000/api/cart'
    return this.http.post<any>(api, {userid: userid});
  }

  addCart(userid:any, productid:any, quantity:any, price:any,){
    var api = 'http://localhost:3000/api/addToCart'
    return this.http.post<any>(api, {userid:userid, productid:productid, quantity:quantity, price:price})
  }

  deleteProduct(productid:any, ordersid:any){
    var api = `http://localhost:3000/api/deleteProductInCart`
    return this.http.post<any>(api, { productid: productid, ordersid:ordersid });
  }

  payProduct(img:any, userid:any, totalprice:any, username:any, ordersid:any){
    var api = 'http://localhost:3000/api/makePayment'
    return this.http.post<any>(api, {img:img, userid:userid, totalprice:totalprice, username:username, ordersid:ordersid});
  }

  getInventory(userid:any){
    var api = 'http://localhost:3000/api/inventory'
    return this.http.post<any>(api, {userid:userid})
  }
}
