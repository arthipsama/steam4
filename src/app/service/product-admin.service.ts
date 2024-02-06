import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { productData } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductAdminService {

  private apiUrl = 'http://localhost:3000/api/productadmin'; // แทนที่ด้วย URL ของ API ของคุณ

  constructor(private http: HttpClient) { }

  getProductData(searchProductName?: string, selectedStatus?: string): Observable<any[]> {
    const params = new HttpParams()
      .set('searchProductName', searchProductName || '')
      .set('selectedStatus', selectedStatus || '');
  
    return this.http.get<any[]>(`${this.apiUrl}/getall`, { params });
  }

  addNewProduct(newProductData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/add`, newProductData);
  }

  getCategoryData(): Observable<any[]> {
    // ฟังก์ชันดึงข้อมูลประเภทสินค้า
    return this.http.get<any[]>(`${this.apiUrl}/getcategory`);
  }

  deleteProduct(productId: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/delete/${productId}`);
  }

  getProductById(productId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/getbyid/${productId}`);
  }

  editProduct(productId: string, productData: productData): Observable<productData> {
    const url = `${this.apiUrl}/edit/${productId}`;
    return this.http.put<productData>(url, productData);
  }
  
}
