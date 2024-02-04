
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { userData } from 'src/app/models/user.models';
import { AlertServiceService } from 'src/app/service/alert-service.service';
import { RoomService } from 'src/app/service/room.service';
import { trigger, state, transition, animate, style as angularStyle } from '@angular/animations';
import { Location } from '@angular/common';

@Component({
  selector: 'app-account-detail',
  templateUrl: './account-detail.component.html',
  styleUrls: ['./account-detail.component.scss'],
  animations: [
    trigger('rotateAnimation', [
      state('start', angularStyle({ transform: 'rotate(0deg)' })), // เปลี่ยน style เป็น angularStyle
      state('end', angularStyle({ transform: 'rotate(360deg)' })), // เปลี่ยน style เป็น angularStyle
      transition('start <=> end', animate('1s ease-in-out')),
    ]),
  ],
})
export class AccountDetailComponent implements OnInit {
  userData:any | userData;
  displayEmail!: string;
  animationState: string = 'start';
  userForm!: FormGroup;


  constructor( 
    private route: ActivatedRoute , 
    private router: Router,
    private alertService: AlertServiceService,
    private room: RoomService,
    private fb: FormBuilder,
    private location: Location
    
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

    let userid  = this.route.snapshot.paramMap.get('id');
    console.log("uses id is",userid)

    userid && this.room.getuserbyid(userid).subscribe((res) => {
      this.userData = res;
      this.displayEmail = res!.Email!;
      console.log(res);
    
      // ตรวจสอบว่า userForm ถูกสร้างแล้ว
      if (this.userForm) {
        this.userForm.patchValue({
          firstName: this.userData?.FirstName,
          lastName: this.userData?.LastName,
          email: this.userData?.Email,
          phoneNumber: this.userData?.PhoneNumber,
          password: this.userData?.Password,
          role: this.userData?.Role,
          contact: this.userData?.Contact,
          // ... กำหนดค่าเริ่มต้นของฟิลด์อื่น ๆ
        });
      }
    });
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


// userForm: FormGroup = this.fb.group({
//   FirstName: ['', Validators.required],
//   LastName: [''],  // เพิ่ม control สำหรับ LastName
//   Email: ['', [Validators.required, Validators.email]],  // เพิ่ม control สำหรับ Email
//   Phone: ['', Validators.required],  // เพิ่ม control สำหรับ Phone
//   Password: ['', Validators.required],  // เพิ่ม control สำหรับ Password
//   Role: ['']  // เพิ่ม control สำหรับ Role
// });

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



// navigateTo(url: string): void {
//   this.route.navigate([url]);
// }
  

}
