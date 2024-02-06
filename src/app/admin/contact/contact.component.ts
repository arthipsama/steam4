import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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

  searchUserName: string = '';
  selectedRole: string = 'All';
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

    this.onSearch();
    }

    onSearch(): void {
      this.currentPage = 1;
      console.log('Search Term:', this.searchUserName);
      this.selectedRole = 'All';  // เปลี่ยนเป็น 'All', 'true' หรือ 'false' ตามที่ต้องการ
      this.ContactService.getContactMeData(this.searchUserName, this.selectedRole).subscribe(contacts => {
        this.contact = contacts;
        this.recordCount = contacts.length;
        console.log('Contacts:', contacts);
      });
    }
    
    onRoleChange(): void {
      this.currentPage = 1;
      this.searchUserName = '';
      console.log('Status select:', this.selectedRole);
      
      this.ContactService.getContactMeData(this.searchUserName, this.selectedRole).subscribe(contacts => {
        this.contact = contacts;
        this.recordCount = contacts.length;
        console.log(contacts);
      });
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
        this.alert.withOutTranslate.onDeleteRe();
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

  
    // Pagination
    @Input() currentPage = 1;
    @Input() recordCount : number = 0;
    @Output() pageChange = new EventEmitter();
    itemsPerPage: number = 5; 
  
    pageChanged(event: any): void {
      this.currentPage = event;
      console.log('pageChanged ' ,event);
      this.pageChange.emit(this.currentPage);
    }
  // end Pagination
  
  sortColumn: string = 'contactmeid'; // เลือกคอลัมน์ที่คุณต้องการเรียงลำดับตาม
  sortDirection: number = 1; // 1 คือเรียงจากน้อยไปมาก, -1 คือเรียงจากมากไปน้อย
  
  sortData(): void {
    this.contact.sort((a, b) => {
      const valA = this.getValue(a, this.sortColumn);
      const valB = this.getValue(b, this.sortColumn);
  
      if (typeof valA === 'string' && typeof valB === 'string') {
        return valA.toLowerCase().localeCompare(valB.toLowerCase()) * this.sortDirection;
      } else if (typeof valA === 'number' && typeof valB === 'number') {
        return (valA - valB) * this.sortDirection;
      } else {
        return 0;
      }
    });
  }
  
  
  getDateValue(obj: any, column: string): Date {
    const dateString = this.getValue(obj, column);
    return new Date(dateString);
  }

  toggleSort(column: string) {
    if (this.sortColumn === column) {
      this.sortDirection *= -1;
    } else {
      this.sortColumn = column;
      this.sortDirection = 1;
    }
  
    this.sortData();
  }
  
  

   getValue(obj: any, column: string): any {
        // ตรวจสอบว่า obj[column] มีค่าหรือไม่
    return obj[column] !== undefined ? obj[column] : '';
} 


}
