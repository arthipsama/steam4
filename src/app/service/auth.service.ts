import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { userData } from '../models/user.models';
import { RoomDTO } from '../models/room.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userData = new BehaviorSubject<any>(null);
  currentUser = this.userData.asObservable();

  private apiUrl = 'http://localhost:3000/api/login';
  constructor(private http: HttpClient,
    ) { }

  postlogin(username: any, password: any){
    return this.http.post<any>(this.apiUrl, {username: username, password: password})
  }

  postregister(username:string, password:string, firstname:string, lastname:string, phoneNumber:string, email:string, contact:string){
    var api = 'http://localhost:3000/api/register'
    
    return this.http.post<any>(api, {username:username, password:password, firstname:firstname, lastname:lastname, phoneNumber:phoneNumber, email:email, contact:contact})
  }

  editProfile(userid:string, firstname:string, lastname:string, phoneNumber:string, email:string, contact:string){
    var api = 'http://localhost:3000/api/editProfile'
    return this.http.put(api, {userid:userid, firstname:firstname, lastname:lastname, phoneNumber:phoneNumber, email:email, contact:contact})
  }

  UserData(userid:any){
    var api = 'http://localhost:3000/api/getUserData'
    return this.http.post<any>(api, {userid:userid})
  }

  updatePassword(oldPassword:string, newPassword:string, userid:any){
    var api = 'http://localhost:3000/api/newpassword'
    return this.http.post<any>(api, {oldPassword:oldPassword, newPassword:newPassword, userid:userid})
  }

  outputUserData(userData: userData){
    this.userData.next(userData);
  }

  getUserRole(): string {
    // ตัวอย่าง: สมมติว่าข้อมูลผู้ใช้เก็บใน userData
    return this.userData.value ? this.userData.value.Role : '';
  }

  checkUserRole(): string | undefined {
    // โค้ดตรวจสอบ Role และ return ค่า
    let storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
      const userData = JSON.parse(storedUserData);
      return userData.Role;
    }
    // หรือ return undefined หรือค่าที่เหมาะสมในกรณีที่ไม่พบข้อมูลผู้ใช้
    return '';
  }
  
}
