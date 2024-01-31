import { HttpClient } from '@angular/common/http';
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
    var api = 'http://localhost:3000/api/orders'
    return this.http.post<any>(api, {userid:userid});
  }

  cart(userid: any){
    var api = 'http://localhost:3000/api/cart'
    return this.http.post<any>(api, {userid: userid});
  }
}
