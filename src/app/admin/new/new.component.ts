import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { productData } from 'src/app/models/product.model';
import { userData } from 'src/app/models/user.models';
import { AlertServiceService } from 'src/app/service/alert-service.service';
import { RoomService } from 'src/app/service/room.service';
import { PopUpProductComponent } from '../product/pop-up-product/pop-up-product.component';
import { PopUpContactComponent } from '../contact/pop-up-contact/pop-up-contact.component';
import { PopUpContentComponent } from './pop-up-content/pop-up-content.component';
import { ContentDTO } from 'src/app/models/content.model';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss']
})
export class NewComponent implements OnInit {
  
  constructor(private dialog: MatDialog,
    private router: Router,
    private room: RoomService,
    private alert: AlertServiceService,
    
    ) { }

  content: ContentDTO[] = [];

  ngOnInit(): void {
    this.content = this.room.getcontent();
    // this.recordCount = this.user.length;
    }

  getImagePath(Role: string): string {
    return Role === 'ADMIN' ? '../assets/role/admin.png' : '../assets/role/user.png';
  }


  handleTrashClick(){
    this.alert.onDeleteWithConfirmation();
  }

  handleTest(user: userData) {
    // ส่ง userid ไปยังหน้า account-detail
    this.router.navigate(['/admin/user-detail', user.userid]);
    // this.userSelected.emit(user);
  }

  openUserDialog(): void {
    const dialogRef = this.dialog.open(PopUpContentComponent, {
      width: '1050px', // กำหนดขนาด Dialog ตามต้องการ
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
