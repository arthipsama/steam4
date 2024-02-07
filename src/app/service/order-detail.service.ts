import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderDetailService {

  private apiUrl = 'http://localhost:3000/api/orderadmin';  // แทนที่ URL ด้วย URL ของคุณ

  constructor(private http: HttpClient) { }

  getAllOrders(searchOrderName?: string, selectedStatus?: string): Observable<any[]> {
    // กำหนดค่า params ในกรณีที่ searchOrderName และ selectedStatus ถูกส่งมา
    let params = new HttpParams();
    if (searchOrderName) {
      params = params.set('searchOrderName', searchOrderName);
    }
    if (selectedStatus) {
      params = params.set('selectedStatus', selectedStatus);
    }

    // ใช้ HttpClient เพื่อดึงข้อมูลจาก API
    return this.http.get<any[]>(`${this.apiUrl}/getall`, { params });
  }

  
  getOrderById(ordersid: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/getbyid/${ordersid}`);
  }

  getOrderDetails(ordersid: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/details/${ordersid}`);
  }

  updateOrder(ordersid: string, paymentstatus: string, remark: string): Observable<any> {
    const updateUrl = `${this.apiUrl}/update/${ordersid}`;
    const body = { paymentstatus, remark };

    return this.http.put(updateUrl, body);
  }

  
}
