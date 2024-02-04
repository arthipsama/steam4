import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { productData } from 'src/app/models/product.model';
import { userData } from 'src/app/models/user.models';
import { AlertServiceService } from 'src/app/service/alert-service.service';
import { RoomService } from 'src/app/service/room.service';
import { PopUpProductComponent } from '../product/pop-up-product/pop-up-product.component';
import { OrderDTO } from 'src/app/models/order.model';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  
  constructor(private dialog: MatDialog,
    private router: Router,
    private room: RoomService,
    private alert: AlertServiceService,
    
    ) { }

  // product: productData[] = [];
  orders: OrderDTO[] = [];


  ngOnInit(): void {
    this.orders = this.room.getOrders();
    // this.recordCount = this.user.length;
    console.log('Orders from room service:', this.orders);
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
  
  isValidImageUrl(url: string): boolean {
    // ตรวจสอบว่า URL ถูกต้องหรือไม่
    // คุณสามารถใช้เงื่อนไขที่เหมาะสมตามลิงก์ที่ได้รับมา
    return true;
  }
  
  waitStatus: any;

  
}
