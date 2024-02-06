import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ContactMeDTO } from '../models/contactme.model';

@Injectable({
  providedIn: 'root'
})
export class ContactmeAdminService {

  private apiUrl = 'http://localhost:3000/api/contactme'; // URL ของ API ของคุณ

  constructor(private http: HttpClient) { }

  getContactMeData(searchUserName?: string, selectedRole?: string): Observable<any[]> {
    const params = new HttpParams()
      .set('searchUserName', searchUserName || '')
      .set('selectedRole', selectedRole || '');  // แก้ไขตรงนี้เพื่อให้ selectedRole ถูกต้อง
  
    return this.http.get<any[]>(`${this.apiUrl}/getall`, { params });
  }

  
  getContactMeById(contactmeid: string): Observable<any> {
    const url = `${this.apiUrl}/${contactmeid}`;
    return this.http.get<any>(url);
  }

  updateContact(contactmeid: string, updatedContact: ContactMeDTO): Observable<any> {
    const url = `${this.apiUrl}/update/${contactmeid}`;
    return this.http.put<any>(url, updatedContact);
  }

  deleteContact(contactmeid: string): Observable<any> {
    const url = `${this.apiUrl}/delete/${contactmeid}`;
    return this.http.delete<any>(url);
  }

}
