import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

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
}
