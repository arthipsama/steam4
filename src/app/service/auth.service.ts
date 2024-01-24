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

  postregister(username:any, password:any, firstname:any, lastname:any, phoneNumber:any, email:any, contact:any){
    var api = 'http://localhost:3000/api/register'
    return this.http.post<any>(api, {username:username, password:password, firstname:firstname, lastname:lastname, phoneNumber:phoneNumber, email:email, contact:contact})
  }

  outputUserData(userData: userData){
    this.userData.next(userData);
  }
}
