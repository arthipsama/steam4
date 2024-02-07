import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { userData } from '../models/user.models';

@Injectable({
  providedIn: 'root'
})
export class AuthAdminService {

  private apiUrl = 'http://localhost:3000/api/useradmin'; // แก้ตาม URL ของ API ที่คุณสร้าง

  constructor(private http: HttpClient) { }

  getAllUsers(UserName?: string, Role?: string): Observable<any[]> {
    let url = `${this.apiUrl}/getall`;
  
    // Build query parameters based on provided values
    const queryParams = [];
    if (UserName) {
      queryParams.push(`UserName=${UserName}`);
    }
    if (Role) {
      queryParams.push(`Role=${Role}`);
    }
  
    // Append query parameters to the URL if there are any
    if (queryParams.length > 0) {
      url += '?' + queryParams.join('&');
    }
  
    console.log('API URL:', url); // แสดง URL ที่ใช้สำหรับ HTTP request
    return this.http.get<any[]>(url);
  }
  

  getUserById(id: string): Observable<userData | undefined> {
    // ใช้ HTTP GET เพื่อดึงข้อมูลจาก API โดยใช้ id เป็น parameter
    return this.http.get<userData>(`${this.apiUrl}/getbyid/${id}`);
  }

  addUser(userData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/add`, userData);
  }

    // เพิ่มฟังก์ชันสำหรับแก้ไขข้อมูลผู้ใช้
  editUser(userId: string, userData: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/edit/${userId}`, userData);
  }

  deleteUser(userId: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/delete/${userId}`);
  }

  editProfile(userid:string, firstname:string, lastname:string, phoneNumber:string, email:string, contact:string, password:string){
    var api = `${this.apiUrl}/editProfile`
    return this.http.put(api, {userid:userid, firstname:firstname, lastname:lastname, phoneNumber:phoneNumber, email:email, contact:contact , password:password})
  }

  

}
