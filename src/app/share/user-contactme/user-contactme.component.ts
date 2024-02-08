import { Component, ElementRef, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { userData } from 'src/app/models/user.models';
import { ColorService } from 'src/app/service/color.service';
import { ContactMeService } from 'src/app/service/contact-me.service';

@Component({
  selector: 'app-user-contactme',
  templateUrl: './user-contactme.component.html',
  styleUrls: ['./user-contactme.component.scss']
})
export class UserContactmeComponent {
  userData!: userData;
  contactmeForm!: FormGroup;

  constructor(private colorService: ColorService ,
              private renderer: Renderer2, 
              private el: ElementRef,
              private fb: FormBuilder,
              private serviceContact: ContactMeService){}

  ngOnInit(){
    this.colorService.backgroundColor$.subscribe((color) => {
      this.renderer.setStyle(this.el.nativeElement.ownerDocument.body, 'background-color', color);
    });

    let storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
        this.userData = JSON.parse(storedUserData);
    }
    this.initForm();
  }

  initForm(){
    this.contactmeForm = this.fb.group({
      email: ['', Validators.required],
      name: ['',  Validators.required],
      subject: ['',  Validators.required],
      message: ['',  Validators.required]
    })
  }

  Sand(){
    var email = this.contactmeForm.value.email;
    var name = this.contactmeForm.value.name;
    var subject = this.contactmeForm.value.subject;
    var message = this.contactmeForm.value.message;
    if(this.contactmeForm.valid){
      this.serviceContact.postContactme(email, name, subject, message, this.userData.userid).subscribe(x=>{
        console.log("ส่งข้อมูลสำเร็จ");
      })
    }
  }
}
