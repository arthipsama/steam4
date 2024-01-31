import { Component, Inject } from '@angular/core';
import { AccountComponent } from '../account.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { userData } from 'src/app/models/user.models';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-pop-up-user',
  templateUrl: './pop-up-user.component.html',
  styleUrls: ['./pop-up-user.component.scss']
})
export class PopUpUserComponent {


  data: any; // ประกาศตัวแปร data ให้เหมือนกับที่คุณใช้

  // สร้าง FormGroup พร้อมกับ Validation
  userForm: FormGroup = this.fb.group({
    UserName: ['', [Validators.required]],
    Password: ['', [Validators.required]],
    Email: ['', [Validators.required, Validators.email]],
    FirstName: [''],
    PhoneNumber: [''],
    role: ['', [Validators.required]]
  });

  constructor(private fb: FormBuilder) {}

  onNoClick(): void {
    
  }

onSave() {
  if (this.userForm.valid) {
    // ดำเนินการบันทึกข้อมูล หรือส่งข้อมูลไปทำงานต่อไป
    const formData = this.userForm.value;
    console.log('Data to be saved:', formData);
    // ตรวจสอบข้อมูลเพิ่มเติมและดำเนินการต่อไปตามที่คุณต้องการ
  } else {
    console.log('Invalid Form');
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


}
