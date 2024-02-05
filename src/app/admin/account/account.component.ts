import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PopUpUserComponent } from './pop-up-user/pop-up-user.component';
import { userData } from 'src/app/models/user.models';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, delay, of } from 'rxjs';
import { RoomService } from 'src/app/service/room.service';
import { AlertServiceService } from 'src/app/service/alert-service.service';
import { AuthAdminService } from 'src/app/service/auth-admin.service';


@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {


  constructor(private dialog: MatDialog,
    private router: Router,
    private room: RoomService,
    private alert: AlertServiceService,
    private authAdminService: AuthAdminService,
    private route: ActivatedRoute, 
    private Auth: AuthAdminService,
    
    ) { }

  user: userData[] = [];

  ngOnInit(): void {
    // this.user = this.room.getuser();
    // this.recordCount = this.user.length;
    this.authAdminService.getAllUsers().subscribe(users => {
      this.user = users;
      console.log(users); // ทำสิ่งที่คุณต้องการกับข้อมูลที่ได้รับ
    });
    }

  getImagePath(Role: string): string {
    return Role === 'ADMIN' ? '../assets/role/admin.png' : '../assets/role/user.png';
  }


  async handleTrashClick(userId: string) {
    const confirmed = await this.alert.onDeleteWithConfirmation();
  
    if (confirmed && userId) {
      this.deleteUser(userId);
    }
  }
  
  private async deleteUser(userId: string) {
      this.Auth.deleteUser(userId).subscribe(
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
  
  

  deletionError: string | null = null;

  // ...
  
  showErrorMessage(message: string): void {
    this.deletionError = message;
  }

  handleTest(user: userData) {
    // ส่ง userid ไปยังหน้า account-detail
    this.router.navigate(['/admin/user-detail', user.userid]);
    // this.userSelected.emit(user);
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

  isActive(route: string, userid?: string): boolean {
    return this.router.isActive(route + userid, true);
  }
  
  
  
  
  
}
