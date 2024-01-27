import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { productData } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private productData = new BehaviorSubject<any>(null);

  constructor(private http: HttpClient) { }

  getProduct(){
    var api = 'http://localhost:3000/api/product'
    return this.http.get(api);
  }

  setProductData(productDetail: productData){
    this.productData.next(productDetail);
  }

  getProdectData$(): Observable<any> {
    return this.productData.asObservable();
 }
}
