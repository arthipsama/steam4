import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ContactMeService {

  constructor(private http: HttpClient) { }

  postContactme(email:any, name:any, subject:any, message:any, userid:any){
    var api = 'http://localhost:3000/api/contactme';
    return this.http.post<any>(api, {email:email, name:name, subject:subject, message:message, userid:userid})
  }
}
