import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { userData } from 'src/app/models/user.models';
import { AlertServiceService } from 'src/app/service/alert-service.service';
import { RoomService } from 'src/app/service/room.service';
import { PopUpUserComponent } from '../account/pop-up-user/pop-up-user.component';
import { ContactMeDTO } from 'src/app/models/contactme.model';
import { PopUpContactComponent } from './pop-up-contact/pop-up-contact.component';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {


  constructor(private dialog: MatDialog,
    private router: Router,
    private room: RoomService,
    private alert: AlertServiceService,
    
    ) { }

  user: userData[] = [];
  contact: ContactMeDTO[] = [];

  ngOnInit(): void {
    this.user = this.room.getuser();
    this.contact = this.room.getcontact();
    console.log('User:', this.user);
    console.log('Contact:', this.contact);
    // this.recordCount = this.user.length;
    }

  getImagePath(Role: string | null): string {
    return Role === 'ADMIN' ? '../assets/role/admin.png' : (Role === 'USER' ? '../assets/role/user.png' : (Role === null ? '../assets/role/user.png' : '../assets/role/user.png'));
  }
  
  

  handleTrashClick(){
    this.alert.onDeleteWithConfirmation();
  }

  handleTest(user: userData) {
    // ส่ง userid ไปยังหน้า account-detail
    this.router.navigate(['/admin/user-detail', user.userid]);
    // this.userSelected.emit(user);
  }

  openUserDialog(contactId: number): void {
    const dialogRef = this.dialog.open(PopUpContactComponent, {
      width: '650px', // กำหนดขนาด Dialog ตามต้องการ
      data: { id: contactId },
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log('Result:', result); // ข้อมูลที่ได้จาก Dialog
    });
  }

  isActive(route: string, userid?: string): boolean {
    return this.router.isActive(route + userid, true);
  }

  
  
  
  
}
