import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PopUpUserComponent } from './pop-up-user/pop-up-user.component';
import { userData } from 'src/app/models/user.models';


@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent {

  constructor(private dialog: MatDialog) { }


  users: userData[] = [
    {
      userid: '#5033',
      // imagePath: '../assets/role/user.png',
      UserName: 'Jassa1',
      Email: 'jassa@jassa.orgjassa@jassajassajassajassajassaasdasdasdasdasd',
      FirstName: 'Arthip',
      LastName: 'Srain',
      PhoneNumber: '0987129295',
      role: 'USER'
    },
    {
      userid: '#5034',
      // imagePath: '../assets/role/admin.png', // แก้ที่นี้ให้ตรงกับที่คุณต้องการ
      UserName: 'Jassa2',
      Email: 'jassa@jassa.orgjassa@jassajassajassajassajassaasdasdasdasdasd',
      FirstName: 'Arthip',
      PhoneNumber: '0987129295',
      LastName: 'Srain',
      role: 'ADMIN'
    },
    {
      userid: '#5035',
      // imagePath: '../assets/role/user.png', // แก้ที่นี้ให้ตรงกับที่คุณต้องการ
      UserName: 'Jassa3',
      Email: 'jassa@jassa.orgjassa@jassajassajassajassajassaasdasdasdasdasd',
      FirstName: 'Arthip',
      LastName: 'Srain',
      PhoneNumber: '0987129295',
      role: 'USER'
    },
    // เพิ่มข้อมูลอื่น ๆ ตามต้องการ
  ];

  getImagePath(role: string): string {
    return role === 'ADMIN' ? '../assets/role/admin.png' : '../assets/role/user.png';
  }

  handleUsersCogClick(){

  }

  handleTrashClick(){
    
  }

  openUserDialog(): void {
    const dialogRef = this.dialog.open(PopUpUserComponent, {
      width: '650px', // กำหนดขนาด Dialog ตามต้องการ
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log('Result:', result); // ข้อมูลที่ได้จาก Dialog
    });
  }
  
  
  
}
