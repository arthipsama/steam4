import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private apiUrl = 'http://localhost:3000/api/dashboard';
  constructor(private http: HttpClient,
    
    ) { }

    CallViewUser(): Observable<number> {
      return this.http.get('http://localhost:3000/api/dashboard/user').pipe(
        map((data: any) => {
          // นับจำนวน userid ในข้อมูลที่ได้
          const userCount = data.length;
          return userCount;
        })
      );
    }
  
    CallViewProduct(): Observable<number> {
      return this.http.get('http://localhost:3000/api/dashboard/product').pipe(
        map((data: any) => {
          // นับจำนวน row ในข้อมูลที่ได้
          const rowCount = data.length;
          // นับผลรวมของคอลัมน์ 'view' ในทุก row
          const sumView = data.reduce((acc: number, row: any) => acc + row.view, 0);
          return sumView;
        })
      );
    }

    CallViewOrder(): Observable<number> {
      return this.http.get<{ totalprice: string }[]>('http://localhost:3000/api/dashboard/order').pipe(
        map(data => {
          const totalOrderPrices = data.map(item => parseFloat(item.totalprice) || 0);
          return totalOrderPrices.reduce((sum, price) => sum + price, 0);
        })
      );
    }    

    CallViewContact(): Observable<number> {
      return this.http.get('http://localhost:3000/api/dashboard/contact').pipe(
        map((data: any) => {
          // นับจำนวน userid ในข้อมูลที่ได้
          const contactCount = data.length;
          return contactCount;
        })
      );
    }

    getMost5ProductsBySaleCount(): Observable<any[]> {
      return this.http.get<any[]>(`${this.apiUrl}/product/most5`);
    }
  
    getMost5ProductsByView(): Observable<any[]> {
      return this.http.get<any[]>(`${this.apiUrl}/product/view5`);
    }

}
