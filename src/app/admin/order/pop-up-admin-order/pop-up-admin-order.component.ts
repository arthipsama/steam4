import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ContactMeDTO } from 'src/app/models/contactme.model';
import { AlertServiceService } from 'src/app/service/alert-service.service';
import { RoomService } from 'src/app/service/room.service';
import { PopUpUserComponent } from '../../account/pop-up-user/pop-up-user.component';
import { OrderDTO } from 'src/app/models/order.model';

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

    
    public dialogRef: MatDialogRef<PopUpUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}



  contact: ContactMeDTO[] = [];
  orders: OrderDTO[] = [];

  ngOnInit(): void {
    const ordersid = this.data.id;
    // Call a service function to get contact details based on contactId
    this.room.getOrderById(ordersid).subscribe((order) => {
      if (order) {
        this.orders = [order]; // Convert to array if not already
        console.log('Order Show:', this.orders);

        this.userForm.patchValue({
          paymentstatus: null,
          remark: null
        });

      } else {
        // Handle the case where contact is undefined
        console.error('Contact not found');
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
    if (this.orders) {
      const updatedContact: OrderDTO = {
        ordersid: this.orders[0].ordersid,
        userid: this.orders[0].userid,
        totalprice: this.orders[0].totalprice,
        productcode: this.orders[0].productcode,
        image: this.orders[0].image,
        CreateBy: this.orders[0].CreateBy,
        CreateDate: this.orders[0].CreateDate,
        UpdateBy: this.orders[0].UpdateBy,
        UpdateDate: this.orders[0].UpdateDate,
        paymentstatus: this.userForm.get('paymentstatus')?.value,
        remark: this.userForm.get('remark')?.value,
        user: this.orders[0].user,
      };
      
  
      console.log('Updated Contact:', updatedContact);
  
      this.alert.withOutTranslate.onSuccessRe();
    }
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
