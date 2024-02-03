import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PopUpUserComponent } from '../../account/pop-up-user/pop-up-user.component';
import { Router } from '@angular/router';
import { AlertServiceService } from 'src/app/service/alert-service.service';
import { RoomService } from 'src/app/service/room.service';
import { category } from 'src/app/models/product.model';

@Component({
  selector: 'app-pop-up-product',
  templateUrl: './pop-up-product.component.html',
  styleUrls: ['./pop-up-product.component.scss']
})
export class PopUpProductComponent implements OnInit {
  selectedCategoryId: number | undefined;
  categoryproduct: category[] = [];
  selectedImage: string | ArrayBuffer | null = null;
// สร้าง FormGroup พร้อมกับ Validation

userForm: FormGroup = this.fb.group({
  ProductName: ['', [Validators.required]],
  categoryproductid: [undefined, [Validators.required]],
  Price: ['', [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
  Quantity: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
  Desciption: [''],
  Image: ['', [Validators.required]],
});

constructor(private fb: FormBuilder,
  private router: Router,
  private room: RoomService,
  private alert: AlertServiceService,
  public dialogRef: MatDialogRef<PopUpUserComponent>,
  @Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit(): void {
    this.categoryproduct = this.room.categoryproduct;

  }

onNoClick(): void {
  
}

onSave() {
if (this.userForm.valid) {
  // ดำเนินการบันทึกข้อมูล หรือส่งข้อมูลไปทำงานต่อไป
  const formData = this.userForm.value;
  delete formData.Image;
  formData.ImgProduct = this.selectedImage;
  console.log('Data to be saved:', formData);
  // ตรวจสอบข้อมูลเพิ่มเติมและดำเนินการต่อไปตามที่คุณต้องการ
} else {
  console.log('Invalid Form');
}
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
