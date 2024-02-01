// src/app/room.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, delay, finalize, of } from 'rxjs';
import { LoaderService } from './loader.service';
import { RoomDTO } from '../models/room.model';
import { userData } from '../models/user.models';


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


  users: userData[] = [
    {
      userid: '5033',
      // imagePath: '../assets/role/user.png',
      UserName: 'Jassa1',
      Email: 'jassa@jassa.orgjassa@jassajassajassajassajassaasdasdasdasdasd',
      FirstName: 'Arthip',
      LastName: 'Srain',
      PhoneNumber: '0987129295',
      Role: 'USER',
      Password:'123',
      Contact:'1852 บ้านสินธร ซอยจุ๋แซ้บๆ',
    },
    {
      userid: '5034',
      // imagePath: '../assets/role/admin.png', // แก้ที่นี้ให้ตรงกับที่คุณต้องการ
      UserName: 'Jassa2',
      Email: 'jassa@jassa.orgjassa@jassajassajassajassajassaasdasdasdasdasd',
      FirstName: 'Arthip',
      PhoneNumber: '0987129295',
      LastName: 'Srain',
      Role: 'ADMIN',
      Password:'123',
      Contact:'1853 บ้านสินธร ซอยจุ๋แซ้บๆ',
    },
    {
      userid: '5035',
      // imagePath: '../assets/role/user.png', // แก้ที่นี้ให้ตรงกับที่คุณต้องการ
      UserName: 'Jassa3',
      Email: 'jassa@jassa.orgjassa@jassajassajassajassajassaasdasdasdasdasd',
      FirstName: 'Arthip',
      LastName: 'Srain',
      PhoneNumber: '0987129295',
      Role: 'USER',
      Password:'123',
      Contact:'1854 บ้านสินธร ชาบูปิ้งย่าง',
    },
    // เพิ่มข้อมูลอื่น ๆ ตามต้องการ
  ];


  getuser() {
    return this.users;
  }

  getuserbyid(id: string): Observable<userData | undefined> {
    const product = this.users.find(p => p.userid === id);
    return of(product).pipe(delay(0)); // delay 500 milliseconds to simulate an API call
  }

}



