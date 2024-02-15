import { trigger, state, transition, animate , style as angularAnimationStyle } from '@angular/animations';
import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { category, productData } from 'src/app/models/product.model';
import { AlertServiceService } from 'src/app/service/alert-service.service';
import { ProductAdminService } from 'src/app/service/product-admin.service';
import { RoomService } from 'src/app/service/room.service';

@Component({
  selector: 'app-product-admin-detail',
  templateUrl: './product-admin-detail.component.html',
  styleUrls: ['./product-admin-detail.component.scss'],
  animations: [
    trigger('rotateAnimation', [
      state('start', angularAnimationStyle({ transform: 'rotate(0deg)' })),
      state('end', angularAnimationStyle({ transform: 'rotate(360deg)' })),
      transition('start <=> end', animate('1s ease-in-out')),
    ]),
  ],
})

export class ProductAdminDetailComponent implements OnInit {
  // userData:any | userData;
  productsData:any | productData;
  categoryproduct$: Observable<category[]> = new Observable<category[]>();

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
    private productService: ProductAdminService,
    
    ) {

      this.userForm = this.fb.group({
        ProductName: ['', Validators.required],  // เพิ่ม control นี้
        price: ['', [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]],  // ตรวจสอบทศนิยมไม่เกิน 2 ตำแหน่ง
        saleprice: ['', [Validators.pattern(/^\d+(\.\d{1,2})?$/)]], // ให้สามารถเป็น null ได้
        Description: [''],
        quantity: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
        categoryproductid: [''],
        ImgProduct: [''],
        // ... เพิ่มฟิลด์อื่น ๆ ตามต้องการ
      });      
     }

     ngOnInit(): void {
      let productId = this.route.snapshot.paramMap.get('id');
      // console.log("User ID is", productId);
  
      productId && this.productService.getProductById(productId).subscribe((res) => {
        // ทำอะไรกับข้อมูลสินค้าที่ได้รับ
        this.productsData = res;
        // console.log('Product Data', res);
  
        // เก็บค่า ImgProduct ต้นฉบับ
        this.originalImgProduct = res?.ImgProduct;
  
        this.categoryproduct$ = this.room.getcategory();
  
        // ตรวจสอบว่า userForm ถูกสร้างแล้ว
        if (this.userForm) {
          this.userForm.patchValue({
            ImgProduct: res?.ImgProduct,
            ProductName: res?.ProductName,
            price: res?.price,
            saleprice: res?.saleprice,
            Description: res?.Description,
            quantity: res?.quantity,
            categoryproductid: res?.categoryproductid,
            // ... กำหนดค่าเริ่มต้นของฟิลด์อื่น ๆ
          });
        }
      });
    }


isSaveButtonDisabled(): boolean {
  return this.userForm.invalid;
}

onSave() {
  // Assuming you're getting productId from route params
  const productId = this.route.snapshot.params['id'];
  // console.log("User ID is", productId);


  // ตรวจสอบว่าข้อมูลทั้งหมดถูกกรอกให้ถูกต้องหรือไม่
  if (this.isValidFormData()) {
    // ทำบันทึกข้อมูล
    this.animationState = this.animationState === 'start' ? 'end' : 'start';

    // เพิ่มค่ารูปที่แปลงเป็น base64 ไปยัง this.userForm.value
    const formDataWithImage = {
      ...this.userForm.value,
      ImgProduct: this.selectedFile || this.originalImgProduct,
    };
    
    // console.log('Data to be saved:', formDataWithImage);

    this.productService.editProduct(productId, formDataWithImage).subscribe(
      (response) => {
        // สำเร็จ
        // console.log('Successfully edited:', response);
        this.alertService.onSuccess('แก้ไขข้อมูลสำเร็จ', '/admin/product');
        
        // ทำตามที่คุณต้องการเพิ่มเติม
      },
      (error) => {
        // ไม่สำเร็จ
        // console.error('Error editing data:', error);
        this.alertService.withOutTranslate.onError('เกิดข้อผิดพลาดในการแก้ไขข้อมูล');
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
    formValue.ProductName &&
    formValue.price &&
    formValue.categoryproductid &&
    (formValue.quantity !== undefined || this.productsData?.quantity === 0)
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
