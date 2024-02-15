import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { category } from 'src/app/models/product.model';
import { AlertServiceService } from 'src/app/service/alert-service.service';
import { RoomService } from 'src/app/service/room.service';
import { PopUpUserComponent } from '../../account/pop-up-user/pop-up-user.component';
import { ContentDTO } from 'src/app/models/content.model';
import { ContentAdminService } from 'src/app/service/content-admin.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-pop-up-content',
  templateUrl: './pop-up-content.component.html',
  styleUrls: ['./pop-up-content.component.scss']
})
export class PopUpContentComponent implements OnInit {
  type: boolean | null = null;
  content: ContentDTO[] = [];
  selectedImage: string | ArrayBuffer | null = null;
  
  // สร้าง FormGroup พร้อมกับ Validation
  userForm: FormGroup;
  
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private room: RoomService,
    private alert: AlertServiceService,
    private contentService: ContentAdminService,

    
    public dialogRef: MatDialogRef<PopUpUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    // กำหนดค่าเริ่มต้นให้กับ type ใน constructor

  
    // สร้าง FormGroup
    this.userForm = this.fb.group({
      ContentName: ['', [Validators.required]],
      type: [''],
      Description: [''],
      Image: ['', [Validators.required]],
    });
  }
  
  ngOnInit(): void {
    this.content = this.room.content;
    this.userForm.get('type')?.setValidators([Validators.required]);
  }

onNoClick(): void {
  
}

onSave() {
  if (this.userForm.valid) {
    const formData = this.userForm.value;
    // delete formData.Image;
    formData.Image = null;
    delete formData.Image;
    formData.ImgContentPath = this.selectedImage;
    // console.log('ส่งออก' , formData);

    // เรียกใช้ addContent และ subscribe ตาม
    this.contentService.addContent(formData).subscribe(
      (response) => {
        // ดำเนินการหลังจากบันทึกข้อมูลเสร็จสิ้น
        // console.log('Data saved successfully:', response);
        this.alert.withOutTranslate.onSuccessRe();

        // ทำสิ่งที่คุณต้องการต่อไป
        this.additionalOperationAfterSave();
      },
      (error) => {
        // แสดงข้อผิดพลาดหรือทำสิ่งที่ต้องการในกรณีที่เกิดข้อผิดพลาด
        // console.error('Error saving data:', error);
        if (error instanceof HttpErrorResponse) {
          // console.log('Status:', error.status);
          // console.log('Status Text:', error.statusText);
          // console.log('Error Object:', error.error);
        }
      }
    );

  } else {
    // console.log('Invalid Form');
  }
}

additionalOperationAfterSave() {
  // เพิ่มโค้ดที่ต้องการทำเพิ่มเติมหลังจากบันทึกข้อมูล
  // console.log('Additional operation after save');
}


onReset() {
  this.userForm.reset();
  this.selectedImage = null;
  // เพิ่มบรรทัดนี้เพื่อรีค่า selectedImage
  this.userForm.get('Image')?.setValue(null);
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

onFileSelected(event: any): void {
  const file: File = event.target.files[0];
  if (file) {
    this.convertImageToBase64(file);
  }
}

onImageChange(event: any): void {
  const file = event.target.files[0];
  if (file) {
    this.convertImageToBase64(file);
  }
}

convertImageToBase64(file: File): void {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => {
    this.selectedImage = reader.result as string | ArrayBuffer;
    this.imageAttached = true; // ตั้งค่าเป็น true เมื่อมีรูปถูกแนบ
  };
}

imageAttached: boolean = false;



}