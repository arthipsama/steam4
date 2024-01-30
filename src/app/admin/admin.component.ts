import { Component, ElementRef, OnInit } from '@angular/core';
import { ColorService } from '../service/color.service';
import { NavigationEnd, Router } from '@angular/router';
import { AlertServiceService } from '../service/alert-service.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  constructor(private el:ElementRef , 
    private colorService: ColorService,
    private router: Router,
    private alertService: AlertServiceService,
    ){

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // Scroll to top on route change
        window.scrollTo(0, 0);
      }
    });
  }
  
  ngOnInit(): void {


  }

  isActive(route: string): boolean {
    return this.router.isActive(route, true);
  }
  
  logout() {
    this.alertService.onConfirmRoute('ต้องการออกจากระบบ', '/mainpage')
      .then((confirmed) => {
        if (confirmed) {
          this.alertService.onSuccess('ออกจากระบบสำเร็จ')
        } else {
          // กรณีผู้ใช้กด "Cancel" ไม่ต้องทำอะไร
        }
      });
  }
  
  formatNumber(value: number): string {
    // ถ้าตัวเลขมากกว่า 99 ให้แสดง "99+"
    return value > 99 ? '99+' : value.toString();
  }

  isDropdownOpen1 = false;
  isDropdownOpen2 = false;

  toggleDropdown1() {
    this.isDropdownOpen1 = !this.isDropdownOpen1;
  
    // ถ้า toggleDropdown1 ทำงานให้ปิด dropdown ของ toggleDropdown2
    if (this.isDropdownOpen1) {
      this.isDropdownOpen2 = false;
    }
  }
  
  toggleDropdown2() {
    this.isDropdownOpen2 = !this.isDropdownOpen2;
  
    // ถ้า toggleDropdown2 ทำงานให้ปิด dropdown ของ toggleDropdown1
    if (this.isDropdownOpen2) {
      this.isDropdownOpen1 = false;
    }
  }

  removeAllItems() {
    // ทำตามที่ต้องการเมื่อคลิกที่ปุ่ม "Remove All"
    // ตัวอย่าง: this.items = [];
}

  
}
