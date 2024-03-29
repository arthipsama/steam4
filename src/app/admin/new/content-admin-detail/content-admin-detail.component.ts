import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { productData, category } from 'src/app/models/product.model';
import { AlertServiceService } from 'src/app/service/alert-service.service';
import { RoomService } from 'src/app/service/room.service';
import { trigger, state, transition, animate , style as angularAnimationStyle } from '@angular/animations';
import { Location } from '@angular/common';
import { ContentDTO } from 'src/app/models/content.model';
import { ContentAdminService } from 'src/app/service/content-admin.service';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-content-admin-detail',
  templateUrl: './content-admin-detail.component.html',
  styleUrls: ['./content-admin-detail.component.scss'],
  animations: [
    trigger('rotateAnimation', [
      state('start', angularAnimationStyle({ transform: 'rotate(0deg)' })),
      state('end', angularAnimationStyle({ transform: 'rotate(360deg)' })),
      transition('start <=> end', animate('1s ease-in-out')),
    ]),
  ],
})
export class ContentAdminDetailComponent implements OnInit {
  // userData:any | userData;
  // productsData:any | productData;
  contentsData:any | ContentDTO;

  displayEmail!: string;
  animationState: string = 'start';
  userForm!: FormGroup;
  originalImgProduct: string | undefined;  // เพิ่มตัวแปรเก็บค่าเดิม


  constructor( 
    private route: ActivatedRoute , 
    private router: Router,
    private alertService: AlertServiceService,
    private room: RoomService,
    private fb: FormBuilder,
    private location: Location,
    private contentService: ContentAdminService,
    
    ) {

      this.userForm = this.fb.group({
        ImgContentPath: ['' , Validators.required],  // เพิ่ม control นี้
        ContentName: ['' , Validators.required],  // ตรวจสอบทศนิยมไม่เกิน 2 ตำแหน่ง
        type: [null , Validators.required],
        Description: [''],
        // ... เพิ่มฟิลด์อื่น ๆ ตามต้องการ
      });      
     }

     ngOnInit(): void {
      let contentid = this.route.snapshot.paramMap.get('id');
      // console.log("uses id is", contentid);
  
      contentid &&
        this.contentService.getContentById(contentid).subscribe((res) => {
          this.contentsData = res;
          // console.log('ข้อมูลข่าวเกม', res);
  
          // เก็บค่า ImgProduct ต้นฉบับ
          this.originalImgProduct = this.contentsData?.ImgContentPath;
  
          // ตรวจสอบว่า userForm ถูกสร้างแล้ว
          if (this.userForm) {
            this.userForm.patchValue({
              ImgContentPath: this.contentsData?.ImgContentPath,
              ContentName: this.contentsData?.ContentName,
              type: this.contentsData?.type,
              Description: this.contentsData?.Description,
              // ... กำหนดค่าเริ่มต้นของฟิลด์อื่น ๆ
            });
          }
        });
    }

isSaveButtonDisabled(): boolean {
  return this.userForm.invalid;
}

onSave() {
  // ตรวจสอบว่าข้อมูลทั้งหมดถูกกรอกให้ถูกต้องหรือไม่
  const contentid = this.route.snapshot.params['id'];
  // console.log("User ID is", contentid);
  
  if (this.isValidFormData()) {
    // ทำบันทึกข้อมูล
    this.animationState = this.animationState === 'start' ? 'end' : 'start';

    // เพิ่มค่ารูปที่แปลงเป็น base64 ไปยัง this.userForm.value
    const formDataWithImage = {
      ...this.userForm.value,
      ImgContentPath: this.selectedFile || this.originalImgProduct,
    };
    
    // console.log('Data to be saved:', formDataWithImage);

    // เรียกใช้ editContent ของ contentService
    this.contentService.editContent(contentid, formDataWithImage).subscribe(
      (response) => {
        // ดำเนินการหลังจากแก้ไขข้อมูลเสร็จสิ้น
        // console.log('Data edited successfully:', response);
        this.alertService.onSuccess('แก้ไขข้อมูลสำเร็จ', '/admin/new');
      },
      (error) => {
        // แสดงข้อผิดพลาดหรือทำสิ่งที่ต้องการในกรณีที่เกิดข้อผิดพลาด
        // console.error('Error editing data:', error);
        if (error instanceof HttpErrorResponse) {
          // console.log('Status:', error.status);
          // console.log('Status Text:', error.statusText);
          // console.log('Error Object:', error.error);
        }
      }
    );

  } else {
    // console.log('Invalid Form');
    // แสดงข้อความหรือทำอะไรต่อไปในกรณีที่ฟอร์มไม่ถูกต้อง
  }
}



onCancel() {
  // ให้ย้อนกลับไปหน้าก่อนหน้านี้
  this.location.back();
}

// ตรวจสอบว่าข้อมูลทั้งหมดถูกกรอกให้ถูกต้องหรือไม่
isValidFormData(): boolean {
  const formValue = this.userForm.value;
  return (
    formValue.ImgContentPath &&
    formValue.ContentName 
    // &&
    // formValue.type
  );
}


selectedFile: string | undefined;

onFileSelected(event: any): void {
  const file: File = event.target.files[0];
  if (file) {
    this.convertImageToBase64(file);
  }
}

convertImageToBase64(file: File): void {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => {
    this.selectedFile = reader.result as string;
  };
}










}
function angularStyle(arg0: { transform: string; }): import("@angular/animations").AnimationStyleMetadata {
  throw new Error('Function not implemented.');
}
