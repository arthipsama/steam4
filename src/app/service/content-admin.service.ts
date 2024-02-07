import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ContentDTO } from '../models/content.model';

@Injectable({
  providedIn: 'root'
})
export class ContentAdminService {

  private apiUrl = 'http://localhost:3000/api/content';  // URL ของ API ของคุณ

  constructor(private http: HttpClient) { }


  getAllContent(contentName?: string): Observable<any[]> {
    // กำหนดค่า params ในกรณีที่ contentName ถูกส่งมา
    const params = contentName ? new HttpParams().set('ContentName', contentName) : undefined;

    // ใช้ HttpClient เพื่อดึงข้อมูลจาก API
    return this.http.get<any[]>(`${this.apiUrl}/getall`, { params });
  }

  addContent(contentData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/add`, contentData);
  }

  getContentById(contentId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/getbyid/${contentId}`);
  }

  editContent(contentId: string, contentData: ContentDTO): Observable<ContentDTO> {
    const url = `${this.apiUrl}/edit/${contentId}`;
    return this.http.put<ContentDTO>(url, contentData);
  }

  deleteContent(contentId: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/delete/${contentId}`);
  }
  
}
