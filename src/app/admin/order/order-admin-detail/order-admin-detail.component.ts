import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { userData } from 'src/app/models/user.models';
import { AlertServiceService } from 'src/app/service/alert-service.service';
import { RoomService } from 'src/app/service/room.service';
import { trigger, state, transition, animate, style as angularStyle } from '@angular/animations';
import { OrderDTO, OrderDetailDTO } from 'src/app/models/order.model';
import { PopUpAdminOrderComponent } from '../pop-up-admin-order/pop-up-admin-order.component';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-order-admin-detail',
  templateUrl: './order-admin-detail.component.html',
  styleUrls: ['./order-admin-detail.component.scss'],
  animations: [
    trigger('rotateAnimation', [
      state('start', angularStyle({ transform: 'rotate(0deg)' })), // เปลี่ยน style เป็น angularStyle
      state('end', angularStyle({ transform: 'rotate(360deg)' })), // เปลี่ยน style เป็น angularStyle
      transition('start <=> end', animate('1s ease-in-out')),
    ]),
  ],
})
export class OrderAdminDetailComponent implements OnInit {
  userData:any | userData;
  displayEmail!: string;
  animationState: string = 'start';
  userForm!: FormGroup;
  order: any | OrderDTO;
  orderDetail: any |  OrderDetailDTO;

  constructor( 
    private route: ActivatedRoute , 
    private router: Router,
    private alertService: AlertServiceService,
    private room: RoomService,
    private fb: FormBuilder,
    private location: Location,
    private dialog: MatDialog,
    
    ) {

      this.userForm = this.fb.group({
        firstName: ['', Validators.required],
        lastName: [''],
        email: ['', [Validators.required, Validators.email]],
        phoneNumber: ['', Validators.required],
        password:['', Validators.required],
        role:['', Validators.required],
        contact:[''],
        // ... เพิ่มฟิลด์อื่น ๆ ตามต้องการ
      });
     }

     ngOnInit(): void {
      let ordersid = this.route.snapshot.paramMap.get('id');
     
      ordersid && this.room.getOrderById(ordersid).subscribe((res) => {
        this.order = res;
        console.log("Order Main:", res);
      });
     
      // เรียกใช้ method เพื่อดึง OrderDetailDTO ตาม ordersid
      ordersid && this.room.getOrderDetailByOrdersId(ordersid).subscribe((res) => {
        this.orderDetail = res;
        console.log("Order Details:", res);
        this.updateUserFormValues();
      });
  
      // ... (existing code)
    }

    updateUserFormValues() {
      if (this.userForm) {
        this.userForm.patchValue({
          ordersid: this.order?.ordersid,
          productcode: this.order?.productcode,
          image: this.order?.image,
          paymentstatus: this.order?.paymentstatus,
          totalprice: this.order?.totalprice,
          CreateBy: this.order?.CreateBy,
          CreateDate: this.order?.CreateDate,
          remark: this.order?.remark,
          password: this.order?.CreateDate,
          role: this.orderDetail?.Email,
          // ... กำหนดค่าเริ่มต้นของฟิลด์อื่น ๆ
        });
      }
    }
  

  showPassword: boolean = false;

  // Method to toggle password visibility
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
    
  }

isSaveButtonDisabled(): boolean {
  return !this.userForm.get('firstName')?.value ||
         !this.userForm.get('email')?.value ||
         !this.userForm.get('phoneNumber')?.value ||
         !this.userForm.get('password')?.value;
}


onSave() {
  // ตรวจสอบว่าข้อมูลทั้งหมดถูกกรอกให้ถูกต้องหรือไม่
  if (this.isValidFormData()) {
    // ทำบันทึกข้อมูล
    this.animationState = this.animationState === 'start' ? 'end' : 'start';

    console.log('Data to be saved:', this.userForm.value);
    // ทำตามที่คุณต้องการเพิ่มเติม
    this.alertService.onSuccess('บันทึกข้อมูลสำเร็จ', '/admin/user');
  } else {
    console.log('Invalid Form');
    // แสดงข้อความหรือทำอะไรต่อไปในกรณีที่ฟอร์มไม่ถูกต้อง
  }
}

getImagePath(Role: string): string {
  return Role === 'ADMIN' ? '../assets/role/admin.png' : '../assets/role/user.png';
}

onCancel() {
  // ให้ย้อนกลับไปหน้าก่อนหน้านี้
  this.location.back();
}

// ตรวจสอบว่าข้อมูลทั้งหมดถูกกรอกให้ถูกต้องหรือไม่
isValidFormData(): boolean {
  return (
    this.userData.FirstName &&
    this.userData.Email &&
    this.userData.PhoneNumber &&
    this.userData.Password &&
    this.userData.Role
  );
}

getWidthPercentage(): string {
  if (this.order?.paymentstatus === 'wait') {
    return '45'; // หรือค่าที่ต้องการสำหรับ wait
  } else if (this.order?.paymentstatus === 'checked') {
    return '100'; // หรือค่าที่ต้องการสำหรับ checked
  } else if (this.order?.paymentstatus === 'incorrect') {
    return '100'; // หรือค่าที่ต้องการสำหรับ incorrect
  }
  return '0'; // หรือค่าที่ต้องการเมื่อไม่ตรงกับทุกเงื่อนไข
}

topFunction(): void {
  if (document.body.scrollTop !== undefined) {
    document.body.scrollTop = 0; // For Safari
  }
  if (document.documentElement.scrollTop !== undefined) {
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  }
}

openUserDialog(ordersid: number): void {
  const dialogRef = this.dialog.open(PopUpAdminOrderComponent, {
    width: '650px', // กำหนดขนาด Dialog ตามต้องการ
    data: { id: ordersid },
  });

  dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed');
    console.log('Result:', result); // ข้อมูลที่ได้จาก Dialog
  });
}

isButtonDisabled(): boolean {
  // ตรวจสอบว่า this.order มีค่าไม่เป็น null และไม่เป็น undefined ก่อนที่จะใช้ this.order.paymentstatus
  return this.order && (this.order.paymentstatus === 'checked' || this.order.paymentstatus === 'incorrect');
}


}

