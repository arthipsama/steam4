import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ContactMeDTO } from 'src/app/models/contactme.model';
import { AlertServiceService } from 'src/app/service/alert-service.service';
import { RoomService } from 'src/app/service/room.service';
import { PopUpUserComponent } from '../../account/pop-up-user/pop-up-user.component';
import { OrderDTO } from 'src/app/models/order.model';
import { OrderDetailService } from 'src/app/service/order-detail.service';

@Component({
  selector: 'app-pop-up-admin-order',
  templateUrl: './pop-up-admin-order.component.html',
  styleUrls: ['./pop-up-admin-order.component.scss']
})
export class PopUpAdminOrderComponent implements OnInit {

  constructor(private fb: FormBuilder,
      private router: Router,
      private room: RoomService,
      private alert: AlertServiceService,
      private orderService: OrderDetailService,
    
    public dialogRef: MatDialogRef<PopUpUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}



  contact: ContactMeDTO[] = [];
  orders: any | OrderDTO;

  ngOnInit(): void {
    const ordersid = this.data.id;
    // Call a service function to get contact details based on contactId
    this.orderService.getOrderById(ordersid).subscribe((order) => {
      if (order) {
        this.orders = order; // Update the orders property
        console.log('Order Show:', this.orders);
  
        this.userForm.patchValue({
          paymentstatus: null,
          remark: null
        });
      } else {
        console.error('Order not found');
      }
    });
  }
  
  

  // สร้าง FormGroup พร้อมกับ Validation
  userForm: FormGroup = this.fb.group({
    paymentstatus: ['', [Validators.required]], // เพิ่ม form control สำหรับ paymentstatus
    remark: ['', [Validators.required]],
  });



  onNoClick(): void {
    
  }

  onSave() {
    const updatedContact: OrderDTO = {
      ...this.orders,
      paymentstatus: this.userForm.get('paymentstatus')?.value,
      remark: this.userForm.get('remark')?.value,
    };
  
    console.log('Updated Contact:', updatedContact);
  
    // ใช้ ternary operator เพื่อตรวจสอบ this.orders.ordersid ไม่เป็น undefined ก่อนที่จะเรียก updateOrder
    this.orders && this.orders.ordersid
      ? this.orderService.updateOrder(this.orders.ordersid, updatedContact.paymentstatus, updatedContact.remark)
          .subscribe(response => {
            console.log('Update Response:', response);
            // ทำตามที่คุณต้องการทำต่อไป
            this.alert.withOutTranslate.onSuccessRe();
          })
      : console.error('orders.ordersid is undefined');
  }
  
  
  
isSaveButtonDisabled(): boolean {
  // Check if orders exist and is not null
  if (this.orders && this.orders.length > 0) {
    const order = this.orders[0];

    // Check if paymentstatus and remark have values
    return !order.paymentstatus || !order.remark;
  }

  return true; // Disable the Save button if there are no orders or orders is empty
}





onCloseClick(): void {
  this.dialogRef.close();
}

}
