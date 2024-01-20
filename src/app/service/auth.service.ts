import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api/login';
  constructor(private http: HttpClient) { }

  postlogin(data:any){
    return this.http.post(this.apiUrl, data)
  }
}
