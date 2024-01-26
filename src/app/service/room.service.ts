// src/app/room.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, finalize } from 'rxjs';
import { LoaderService } from './loader.service';
import { RoomDTO } from '../models/room.model';


@Injectable({
  providedIn: 'root'
})
export class RoomService  {

private apiUrl = 'http://localhost:3000/api/room';
// private apiUrl = 'https://test-back-js.onrender.com/api/room';

  constructor(private http: HttpClient) {}

  getRooms(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}
