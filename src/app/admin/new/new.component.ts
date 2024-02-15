import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
import { ContentAdminService } from 'src/app/service/content-admin.service';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss']
})
export class NewComponent implements OnInit {
  
  contentName: string = '';

  constructor(private dialog: MatDialog,
    private router: Router,
    private room: RoomService,
    private alert: AlertServiceService,
    private contentService: ContentAdminService,
    
    ) { }

  content: ContentDTO[] = [];

  ngOnInit(): void {
    // this.content = this.room.getcontent();
    // this.recordCount = this.user.length;
    this.onSearch();

    }

    getContentData(): void {
      // เรียกใช้งาน service เพื่อดึงข้อมูล Content และ subscribe เพื่อรับข้อมูลที่ได้
      this.contentService.getAllContent().subscribe(
        (data) => {
          // ให้ content มีค่าเท่ากับข้อมูลที่ได้จาก service
          this.content = data;
        },
        (error) => {
          // กรณีเกิด error ในการดึงข้อมูล
          // console.error('Error fetching content data:', error);
        }
      );
    }

    onSearch(): void {
      this.currentPage = 1;
      // console.log('Search Term:', this.contentName);
      this.contentService.getAllContent(this.contentName).subscribe(contents => {
        this.content = contents;
        this.recordCount = contents.length;
        // console.log('Users:', contents);
      });
    }

  getImagePath(Role: string): string {
    return Role === 'ADMIN' ? '../assets/role/admin.png' : '../assets/role/user.png';
  }


  async handleTrashClick(contentid: string) {
    const confirmed = await this.alert.onDeleteWithConfirmation();
  
    if (confirmed && contentid) {
      this.deleteUser(contentid);
    }
  }
  
  private async deleteUser(contentid: string) {
    try {
      const res = await this.contentService.deleteContent(contentid).toPromise();
      // console.log('Content deleted successfully:', res);
      this.alert.withOutTranslate.onDeleteRe();
    } catch (error) {
      // console.error('Error deleting user', error);
      if ((error as any).status === 500) {
        this.alert.withOutTranslate.onError('ลบไม่สำเร็จเนื่องจากเป็น Content หลักอยู่');
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
    const dialogRef = this.dialog.open(PopUpContentComponent, {
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

  sortColumn: string = 'contentid'; // เลือกคอลัมน์ที่คุณต้องการเรียงลำดับตาม
  sortDirection: number = 1; // 1 คือเรียงจากน้อยไปมาก, -1 คือเรียงจากมากไปน้อย

  sortData(): void {
    this.content.sort((a, b) => {
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
}
