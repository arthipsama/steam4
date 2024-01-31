import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PopUpUserComponent } from './pop-up-user/pop-up-user.component';
import { userData } from 'src/app/models/user.models';
import { Router } from '@angular/router';
import { Observable, delay, of } from 'rxjs';
import { RoomService } from 'src/app/service/room.service';


@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {


  constructor(private dialog: MatDialog,
    private router: Router,
    private room: RoomService,
    ) { }

  user: userData[] = [];

  ngOnInit(): void {
    this.user = this.room.getuser();
    // this.recordCount = this.user.length;
    }

  getImagePath(Role: string): string {
    return Role === 'ADMIN' ? '../assets/role/admin.png' : '../assets/role/user.png';
  }


  handleTrashClick(){
    
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
