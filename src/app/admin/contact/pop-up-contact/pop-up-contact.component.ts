import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PopUpUserComponent } from '../../account/pop-up-user/pop-up-user.component';
import { ContactMeDTO } from 'src/app/models/contactme.model';
import { Router } from '@angular/router';
import { AlertServiceService } from 'src/app/service/alert-service.service';
import { RoomService } from 'src/app/service/room.service';

@Component({
  selector: 'app-pop-up-contact',
  templateUrl: './pop-up-contact.component.html',
  styleUrls: ['./pop-up-contact.component.scss']
})
export class PopUpContactComponent implements OnInit {

  constructor(private fb: FormBuilder,
      private router: Router,
      private room: RoomService,
      private alert: AlertServiceService,

    
    public dialogRef: MatDialogRef<PopUpUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}



  contact: ContactMeDTO[] = [];

  ngOnInit(): void {
    const contactId = this.data.id;
    // Call a service function to get contact details based on contactId
    this.room.getcontactbyid(contactId).subscribe((contact) => {
      if (contact) {
        this.contact = [contact]; // Convert to array if not already
        console.log('Contact:', this.contact);
      } else {
        // Handle the case where contact is undefined
        console.error('Contact not found');
      }
    });
  }
  

  // สร้าง FormGroup พร้อมกับ Validation
  userForm: FormGroup = this.fb.group({
    UserName: ['', [Validators.required]],
    Password: ['', [Validators.required]],
    Email: ['', [Validators.required, Validators.email]],
    FirstName: [''],
    PhoneNumber: [''],
    role: ['', [Validators.required]]
  });



  onNoClick(): void {
    
  }

// pop-up-contact.component.ts

// pop-up-contact.component.ts

onSave() {
  if (this.contact) {
    const updatedContact: ContactMeDTO = {
      contactmeid: this.contact[0].contactmeid,
      textname: this.contact[0].textname,
      subject: this.contact[0].subject,
      textmessage: this.contact[0].textmessage,
      read: true
    };

    this.alert.withOutTranslate.onSuccessRe();

    console.log('Updated Contact:', updatedContact);
  }
}







onCloseClick(): void {
  this.dialogRef.close();
}

}
