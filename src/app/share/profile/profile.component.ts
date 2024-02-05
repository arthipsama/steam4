import { Component, ElementRef, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { userData } from 'src/app/models/user.models';
import { AuthService } from 'src/app/service/auth.service';
import { ColorService } from 'src/app/service/color.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  userData: any;
  profileForm!: FormGroup;
  newUserData!: userData;

  constructor(private router: Router,
              private fb: FormBuilder,
              private service: AuthService,
              private colorService: ColorService ,
              private renderer: Renderer2, 
              private el: ElementRef) {
  }

  ngOnInit() {
    this.colorService.backgroundColor$.subscribe((color) => {
      this.renderer.setStyle(this.el.nativeElement.ownerDocument.body, 'background-color', color);
    });

    let storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
      this.userData = JSON.parse(storedUserData);
    }

    this.service.UserData(this.userData.userid).subscribe(x=>{
      this.newUserData = x[0];
      this.initForm()
    })
  }

  initForm() {
    this.profileForm = this.fb.group({
      firstname: [this.newUserData.FirstName, Validators.required],
      lastname: [this.newUserData.LastName, Validators.required],
      phoneNumber: this.newUserData.PhoneNumber,
      email: [this.newUserData.Email, Validators.email],
      contact: this.newUserData.Contact
    })
  }

  logout() {
    localStorage.removeItem('userData');
    this.router.navigate(['/mainpage']);
  }

  save() {
    var userid = this.userData.userid;
    var firstname = this.profileForm.value.firstname;
    var lastname = this.profileForm.value.lastname;
    var phoneNumber = this.profileForm.value.phoneNumber;
    var email = this.profileForm.value.email;
    var contact = this.profileForm.value.contact;
    if(this.profileForm.valid){
      this.service.editProfile(userid, firstname, lastname, phoneNumber, email, contact).subscribe(x => {
        console.log(x);
      })
    }
    else{
      console.log("ข้อมูลไม่ถูกต้อง");
    }
  }
}
