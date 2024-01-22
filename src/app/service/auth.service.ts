import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { userData } from '../models/user.models';
import { RoomDTO } from '../models/room.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api/login';
  constructor(private http: HttpClient) { }

  postlogin(username: any, password: any){
    return this.http.post<any>(this.apiUrl, {username: username, password: password})
  }
}
