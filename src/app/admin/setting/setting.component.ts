import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { userData } from 'src/app/models/user.models';
import { AlertServiceService } from 'src/app/service/alert-service.service';
import { RoomService } from 'src/app/service/room.service';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss']
})
export class SettingComponent implements OnInit {

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
    this.alertService.onSuccess('บันทึกข้อมูลสำเร็จ', '/admin/dashboard');
  } else {
    console.log('Invalid Form');
    // แสดงข้อความหรือทำอะไรต่อไปในกรณีที่ฟอร์มไม่ถูกต้อง
  }
}

getImagePath(Role: string): string {
  return Role === 'ADMIN' ? '../assets/role/admin.png' : '../assets/role/user.png';
}

// onCancel() {
//   // ให้ย้อนกลับไปหน้าก่อนหน้านี้
//   this.location.back();
// }

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

}
