import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { userData } from 'src/app/models/user.models';
import { AlertServiceService } from 'src/app/service/alert-service.service';
import { RoomService } from 'src/app/service/room.service';
import { PopUpUserComponent } from '../account/pop-up-user/pop-up-user.component';
import { ContactMeDTO } from 'src/app/models/contactme.model';
import { PopUpContactComponent } from './pop-up-contact/pop-up-contact.component';
import { AuthAdminService } from 'src/app/service/auth-admin.service';
import { ContactmeAdminService } from 'src/app/service/contactme-admin.service';

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
    private ContactService: ContactmeAdminService,
    
    ) { }

  user: userData[] = [];
  contact: ContactMeDTO[] = [];

  ngOnInit(): void {
    // this.user = this.room.getuser();
    // this.contact = this.room.getcontact();
    // this.Auth.getAllUsers().subscribe(users => {
    //   this.user = users;
    //   console.log(users); // ทำสิ่งที่คุณต้องการกับข้อมูลที่ได้รับ
    // });

    this.ContactService.getContactMeData().subscribe(contacts => {
      this.contact = contacts;
      console.log(contacts); // ทำสิ่งที่คุณต้องการกับข้อมูลที่ได้รับ
    });

    // console.log('User:', this.user);
    console.log('Contact:', this.contact);
    // this.recordCount = this.user.length;
    }

  getImagePath(Role: string | null): string {
    return Role === 'ADMIN' ? '../assets/role/admin.png' : (Role === 'USER' ? '../assets/role/user.png' : (Role === null ? '../assets/role/user.png' : '../assets/role/user.png'));
  }
  
  

  async handleTrashClick(contactmeid: number) {
    const confirmed = await this.alert.onDeleteWithConfirmation();
    const contactmeidString = contactmeid.toString();
  
    if (confirmed && contactmeid) {
      this.deleteContect(contactmeidString);
    }
  }

  private async deleteContect(contactmeid: string) {
    this.ContactService.deleteContact(contactmeid).subscribe(
      (res) => {
        console.log('User deleted successfully:', res);
        this.alert.withOutTranslate.onSuccessRe();
        return;
      },
      (error) => {
        console.error('Error deleting user', error);
        if (error.status === 500) {
          // แสดงข้อความให้ผู้ใช้ทราบว่าไม่สามารถลบได้เนื่องจากข้อมูลถูกเชื่อมโยง
          this.alert.withOutTranslate.onError('ลบไม่สำเร็จเนื่องจาก Order เชื่อมกันอยู่');
          return;
        }
        // ทำอะไรต่อไปในกรณีเกิด error
      }
    );
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
