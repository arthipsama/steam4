import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ContactMeDTO } from '../models/contactme.model';

@Injectable({
  providedIn: 'root'
})
export class ContactmeAdminService {

  private apiUrl = 'http://localhost:3000/api/contactme'; // URL ของ API ของคุณ

  constructor(private http: HttpClient) { }

  getContactMeData(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl +'/getall');
  }
  
  getContactMeById(contactmeid: string): Observable<any> {
    const url = `${this.apiUrl}/${contactmeid}`;
    return this.http.get<any>(url);
  }

  updateContact(contactmeid: string, updatedContact: ContactMeDTO): Observable<any> {
    const url = `${this.apiUrl}/update/${contactmeid}`;
    return this.http.put<any>(url, updatedContact);
  }

}
