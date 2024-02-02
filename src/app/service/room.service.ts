// src/app/room.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, delay, finalize, of } from 'rxjs';
import { LoaderService } from './loader.service';
import { RoomDTO } from '../models/room.model';
import { userData } from '../models/user.models';
import { ContactMeDTO } from '../models/contactme.model';


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
      FirstName: 'ArthipArthipArthipArthipArthipArthipArthipArthipArthipArthipArthipArthipArthip',
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


  contact: ContactMeDTO[] = [
    {
      contactmeid: 1 ,
      userid: 5033,
      textname: 'Jassa1',
      email: 'jassa@jassa.orgjassa@jassajassajassajassajassaasdasdasdasdasd',
      read: false,
      subject: 'อยากให้จัดโปรโมชั่นบ่อยๆ',
      textmessage: '1852 บ้านสินธร ซอยจุ๋แซ้บๆ',
      user: this.users.find(user => user.userid === '5033'),
    },
    {
      contactmeid: 2 ,
      userid: null,
      textname: 'Jassa2',
      email: 'jassa@jassa.orgjassa',
      read: true,
      subject: 'เกมน้อยไป',
      textmessage: '1853 บ้านสินธร ซอยจุ๋แซ้บๆ',
      user: this.users.find(user => user.userid === null),
    },
    {
      contactmeid: 3 ,
      userid: 5035,
      textname: 'Jassa3',
      email: 'jassa@jassa.orgjassa',
      read: false,
      subject: 'อยากได้เกมราคาถูก',
      textmessage: '1854 บ้านสินธร ชาบูปิ้งย่าง',
      user: this.users.find(user => user.userid === '5035'),
    },
    // เพิ่มข้อมูลอื่น ๆ ตามต้องการ
  ];


  getuser() {
    return this.users;
  }

  getcontact() {
    return this.contact;
  }

  getuserbyid(id: string): Observable<userData | undefined> {
    const product = this.users.find(p => p.userid === id);
    return of(product).pipe(delay(0)); // delay 500 milliseconds to simulate an API call
  }

  getcontactbyid(id: string): Observable<ContactMeDTO | undefined> {
    const product = this.contact.find(p => p.contactmeid === +id);
    return of(product).pipe(delay(0)); // delay 500 milliseconds to simulate an API call
  }

}



