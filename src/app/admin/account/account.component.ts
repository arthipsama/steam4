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

  searchUserName: string = '';
  selectedRole: string = 'All';
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
      this.onSearch();
    }

    onSearch(): void {
      this.currentPage = 1;
      console.log('Search Term:', this.searchUserName);
      this.selectedRole = 'All';
      this.authAdminService.getAllUsers(this.searchUserName).subscribe(users => {
        this.user = users;
        this.recordCount = users.length;
        console.log('Users:', users);
      });
    }
    
    onRoleChange(): void {
      this.currentPage = 1;
      this.searchUserName = '';
      console.log('Statuc select:', this.selectedRole);
      this.authAdminService.getAllUsers(this.searchUserName, this.selectedRole).subscribe(users => {
        this.user = users;
        this.recordCount = users.length;
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


        sortColumn: string = 'userid'; // เลือกคอลัมน์ที่คุณต้องการเรียงลำดับตาม
        sortDirection: number = 1; // 1 คือเรียงจากน้อยไปมาก, -1 คือเรียงจากมากไปน้อย

        sortData(): void {
          this.user.sort((a, b) => {
            const valA = this.getValue(a, this.sortColumn);
            const valB = this.getValue(b, this.sortColumn);

            if (typeof valA === 'string' && typeof valB === 'string') {
              return valA.localeCompare(valB) * this.sortDirection;
            } else {
              return (valA - valB) * this.sortDirection;
            }
          });
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
  
  
}
