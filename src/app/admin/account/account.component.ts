import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent {


  users = [
    {
      userId: '#5033',
      // imagePath: '../assets/role/user.png',
      username: 'Jassa1',
      email: 'jassa@jassa.orgjassa@jassajassajassajassajassaasdasdasdasdasd',
      firstName: 'Arthip',
      phone: '0987129295',
      role: 'USER'
    },
    {
      userId: '#5034',
      // imagePath: '../assets/role/admin.png', // แก้ที่นี้ให้ตรงกับที่คุณต้องการ
      username: 'Jassa2',
      email: 'jassa@jassa.orgjassa@jassajassajassajassajassaasdasdasdasdasd',
      firstName: 'Arthip',
      phone: '0987129295',
      role: 'ADMIN'
    },
    {
      userId: '#5035',
      // imagePath: '../assets/role/user.png', // แก้ที่นี้ให้ตรงกับที่คุณต้องการ
      username: 'Jassa3',
      email: 'jassa@jassa.orgjassa@jassajassajassajassajassaasdasdasdasdasd',
      firstName: 'Arthip',
      phone: '0987129295',
      role: 'USER'
    },
    // เพิ่มข้อมูลอื่น ๆ ตามต้องการ
  ];

  getImagePath(role: string): string {
    return role === 'ADMIN' ? '../assets/role/admin.png' : '../assets/role/user.png';
  }
  
  
}
