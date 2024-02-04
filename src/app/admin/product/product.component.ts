import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { userData } from 'src/app/models/user.models';
import { AlertServiceService } from 'src/app/service/alert-service.service';
import { RoomService } from 'src/app/service/room.service';
import { PopUpUserComponent } from '../account/pop-up-user/pop-up-user.component';
import { productData } from 'src/app/models/product.model';
import { PopUpProductComponent } from './pop-up-product/pop-up-product.component';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  
  constructor(private dialog: MatDialog,
    private router: Router,
    private room: RoomService,
    private alert: AlertServiceService,
    
    ) { }

  product: productData[] = [];

  ngOnInit(): void {
    this.product = this.room.getproduct();
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
    const dialogRef = this.dialog.open(PopUpProductComponent, {
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

  getBackgroundImage(imgProduct: string | null): string {
    if (imgProduct && this.isValidImageUrl(imgProduct)) {
      return `url(${imgProduct})`;
    } else {
      return `url(../assets/NoUpload1.jpg)`;
    }
  }
  
  isValidImageUrl(url: string): boolean {
    // ตรวจสอบว่า URL ถูกต้องหรือไม่
    // คุณสามารถใช้เงื่อนไขที่เหมาะสมตามลิงก์ที่ได้รับมา
    return true;
  }
  

  
}
