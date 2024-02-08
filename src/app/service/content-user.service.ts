import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ContenUserService {

  constructor(private http: HttpClient) { }

  getContent(){
    var api = 'http://localhost:3000/api/contentuser'
    return this.http.get<any>(api)
  }
}
