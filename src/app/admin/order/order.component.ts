import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { productData } from 'src/app/models/product.model';
import { userData } from 'src/app/models/user.models';
import { AlertServiceService } from 'src/app/service/alert-service.service';
import { RoomService } from 'src/app/service/room.service';
import { PopUpProductComponent } from '../product/pop-up-product/pop-up-product.component';
import { OrderDTO } from 'src/app/models/order.model';
import { OrderDetailService } from 'src/app/service/order-detail.service';

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
    private orderService: OrderDetailService,
    
    ) { }

  // product: productData[] = [];
  orders: any[] = [];
  searchUserName: string = '';
  selectedRole: string = 'All';

  ngOnInit(): void {
    this.onSearch();
  }

  onSearch(): void {
    this.currentPage = 1;
    console.log('Search Term:', this.searchUserName);
    this.selectedRole = 'All';
    this.orderService.getAllOrders(this.searchUserName).subscribe(ordersS => {
      this.orders = ordersS;
      this.recordCount = ordersS.length;
      console.log('Users:', ordersS);
    });
  }
  
  onRoleChange(): void {
    this.currentPage = 1;
    this.searchUserName = '';
    console.log('Statuc select:', this.selectedRole);
    this.orderService.getAllOrders(this.searchUserName, this.selectedRole).subscribe(ordersS => {
      this.orders = ordersS;
      this.recordCount = ordersS.length;
      console.log(ordersS); // ทำสิ่งที่คุณต้องการกับข้อมูลที่ได้รับ
    });
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

sortColumn: string = 'ordersid'; // เลือกคอลัมน์ที่คุณต้องการเรียงลำดับตาม
sortDirection: number = 1; // 1 คือเรียงจากน้อยไปมาก, -1 คือเรียงจากมากไปน้อย

sortData() {
  this.orders.sort((a, b) => {
    if (this.sortColumn === 'ordersid') {
      const valA: number = +a.ordersid;  // แปลงเป็นตัวเลขด้วย +
      const valB: number = +b.ordersid;  // แปลงเป็นตัวเลขด้วย +
      return (valA - valB) * this.sortDirection;
    } else if (this.sortColumn === 'totalprice') {
      const valA: number = +a.totalprice;  // แปลงเป็นตัวเลขด้วย +
      const valB: number = +b.totalprice;  // แปลงเป็นตัวเลขด้วย +
      return (valA - valB) * this.sortDirection;
    } else if (this.sortColumn === 'CreateDate') {
      const valA: Date = new Date(a.CreateDate);
      const valB: Date = new Date(b.CreateDate);
      return (valA.getTime() - valB.getTime()) * this.sortDirection;
    } else {
      const valA: string | number = a[this.sortColumn];
      const valB: string | number = b[this.sortColumn];
      if (typeof valA === 'string' && typeof valB === 'string') {
        const nameA = valA.toLocaleLowerCase();
        const nameB = valB.toLocaleLowerCase();
        return nameA.localeCompare(nameB) * this.sortDirection;
      } else {
        return ((valA as number) - (valB as number)) * this.sortDirection;
      }
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


  
}
