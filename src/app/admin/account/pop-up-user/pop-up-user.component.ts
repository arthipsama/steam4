import { Component, Inject } from '@angular/core';
import { AccountComponent } from '../account.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { userData } from 'src/app/models/user.models';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthAdminService } from 'src/app/service/auth-admin.service';
import { AlertServiceService } from 'src/app/service/alert-service.service';

@Component({
  selector: 'app-pop-up-user',
  templateUrl: './pop-up-user.component.html',
  styleUrls: ['./pop-up-user.component.scss']
})
export class PopUpUserComponent {


  // สร้าง FormGroup พร้อมกับ Validation
  userForm: FormGroup = this.fb.group({
    UserName: ['', [Validators.required, Validators.pattern(/^.{6,20}$/)]],
    Password: ['', [Validators.required, Validators.pattern(/^.{8,24}$/)]],
    Email: ['', [Validators.required, Validators.email]],
    FirstName: [''],
    PhoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]{8,10}$')]],
    Role: ['', [Validators.required]]
  });

  constructor(private fb: FormBuilder,
    private Auth: AuthAdminService,
    private alertService: AlertServiceService,

    public dialogRef: MatDialogRef<PopUpUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  onNoClick(): void {
    
  }


  onSave() {
    // ตรวจสอบว่าข้อมูลทั้งหมดถูกกรอกให้ถูกต้องหรือไม่
    if (this.userForm.valid) {
      // ทำ HTTP POST request เพื่อบันทึกข้อมูลผู้ใช้
      this.Auth.addUser(this.userForm.value).subscribe(
        (res) => {
          this.alertService.withOutTranslate.onSuccessRe();
        },
        (error) => {
          const userNameControl = this.userForm.get('UserName');
          const emailControl = this.userForm.get('Email');
          
          if (userNameControl) {
            if (error.error && error.error.error === 'Username already exists') {
              // ในกรณีที่ error เป็น 'Username already exists' แสดง mat-error ที่เกี่ยวข้อง
              userNameControl.setErrors({ duplicate: true });
            }
          }
          
          if (emailControl) {
            if (error.error && error.error.error === 'Email already exists') {
              // ในกรณีที่ error เป็น 'Email already exists' แสดง mat-error ที่เกี่ยวข้อง
              emailControl.setErrors({ duplicate: true });
            }
          }
          // ทำตามที่คุณต้องการเพิ่มเติมในกรณีที่มีข้อผิดพลาด
        }
      );
    } else {
      // แสดงข้อความหรือทำอะไรต่อไปในกรณีที่ฟอร์มไม่ถูกต้อง
    }
  }
  

onReset() {
  this.userForm.reset();
}

// เพิ่มในส่วน property
hidePassword: boolean = true;

// เพิ่มในส่วน methods
togglePasswordVisibility() {
  this.hidePassword = !this.hidePassword;
}

onCloseClick(): void {
  this.dialogRef.close();
}


}
