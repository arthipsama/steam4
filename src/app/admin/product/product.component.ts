import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { userData } from 'src/app/models/user.models';
import { AlertServiceService } from 'src/app/service/alert-service.service';
import { RoomService } from 'src/app/service/room.service';
import { PopUpUserComponent } from '../account/pop-up-user/pop-up-user.component';
import { productData } from 'src/app/models/product.model';
import { PopUpProductComponent } from './pop-up-product/pop-up-product.component';
import { ProductAdminService } from 'src/app/service/product-admin.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  searchProductName: string = '';
  selectedStatus: string = 'All';
  constructor(private dialog: MatDialog,
    private router: Router,
    private room: RoomService,
    private alert: AlertServiceService,
    private prodcutService: ProductAdminService,
    
    ) { }

  product: productData[] = [];

  ngOnInit(): void {
    // this.product = this.room.getproduct();
    // this.recordCount = this.user.length;
    this.onSearch();
    }

    onSearch(): void {
      this.currentPage = 1;
      // console.log('Search Term:', this.searchProductName);
      this.selectedStatus = 'All';
      this.prodcutService.getProductData(this.searchProductName).subscribe(products => {
        this.product = products;
        this.recordCount = products.length;
        // console.log('Users:', products);
      });
    }
    
    onRoleChange(): void {
      this.currentPage = 1;
      this.searchProductName = '';
      // console.log('Statuc select:', this.selectedStatus);
      this.prodcutService.getProductData(this.searchProductName, this.selectedStatus).subscribe(products => {
        this.product = products;
        this.recordCount = products.length;
        // console.log(products); // ทำสิ่งที่คุณต้องการกับข้อมูลที่ได้รับ
      });
    }

  getImagePath(Role: string): string {
    return Role === 'ADMIN' ? '../assets/role/admin.png' : '../assets/role/user.png';
  }


  async handleTrashClick(productid: string) {
    const confirmed = await this.alert.onDeleteWithConfirmation();
  
    if (confirmed && productid) {
      this.deleteUser(productid);
    }
  }
  
  private async deleteUser(productid: string) {
    try {
      const res = await this.prodcutService.deleteProduct(productid).toPromise();
      // console.log('User deleted successfully:', res);
      this.alert.withOutTranslate.onDeleteRe();
    } catch (error) {
      // console.error('Error deleting user', error);
      if ((error as any).status === 500) {
        this.alert.withOutTranslate.onError('ลบไม่สำเร็จเนื่องจาก Order เชื่อมกันอยู่');
      }
      
      // ทำอะไรต่อไปในกรณีเกิด error
    }
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
      // console.log('The dialog was closed');
      // console.log('Result:', result); // ข้อมูลที่ได้จาก Dialog
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
  
    // Pagination
    @Input() currentPage = 1;
    @Input() recordCount : number = 0;
    @Output() pageChange = new EventEmitter();
    itemsPerPage: number = 5; 
  
    pageChanged(event: any): void {
      this.currentPage = event;
      // console.log('pageChanged ' ,event);
      this.pageChange.emit(this.currentPage);
    }
  // end Pagination

  sortColumn: string = 'productid'; // เลือกคอลัมน์ที่คุณต้องการเรียงลำดับตาม
  sortDirection: number = 1; // 1 คือเรียงจากน้อยไปมาก, -1 คือเรียงจากมากไปน้อย

  sortData(): void {
    this.product.sort((a, b) => {
      const valA = this.getValue(a, this.sortColumn);
      const valB = this.getValue(b, this.sortColumn);
  
      if (typeof valA === 'string' && typeof valB === 'string') {
        const numA = Number(valA.replace(/,/g, ''));
        const numB = Number(valB.replace(/,/g, ''));
        return (numA - numB) * this.sortDirection;
      } else if (typeof valA === 'number' && typeof valB === 'number') {
        return (valA - valB) * this.sortDirection;
      } else {
        return 0;
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
    

  
}
