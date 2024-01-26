import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  getProduct(){
    var api = 'http://localhost:3000/api/product'
    return this.http.get(api);
  }
}
