import { Component, ElementRef, Renderer2 } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { userData } from 'src/app/models/user.models';
import { AlertServiceService } from 'src/app/service/alert-service.service';
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
  newPassword: string = '';
  oldPassword: string = '';
  chacknewPassword: string = '';

  constructor(private router: Router,
              private fb: FormBuilder,
              private service: AuthService,
              private colorService: ColorService ,
              private renderer: Renderer2, 
              private el: ElementRef,
              private alert: AlertServiceService
              ) {
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
      this.initForm();
    })
  }

  initForm() {
    this.profileForm = this.fb.group({
      firstname: [this.newUserData.FirstName || '', Validators.required],
      lastname: [this.newUserData.LastName || ''],
      phoneNumber: [this.newUserData.PhoneNumber || '', [Validators.required, Validators.pattern('^[0-9]{9,10}$')]],
      email: [this.newUserData.Email || '', [Validators.email, Validators.required]],
      contact: this.newUserData.Contact || ''
    })
    this.profileForm.controls['email'].disable();
  }

  logout() {
    localStorage.removeItem('userData');
    this.router.navigate(['/mainpage']);
  }

  updatePassword(oldPassword:string, newPassword: string, chacknewPassword: string) {
    if(newPassword.length >= 8 && newPassword.length <= 25){
      if(newPassword == chacknewPassword){
        this.service.updatePassword(oldPassword, newPassword, this.userData.userid).subscribe(x => {
          if (x.body) {
            this.alert.withOutTranslate.onSuccessRe();
          } else{
            this.alert.withOutTranslate.onError('รหัสผ่านปัจจุบันไม่ถูกต้อง.');
          }
        });
      }else{
        this.alert.withOutTranslate.onError('กรุณายืนยันรหัสผ่านให้ถูกต้อง.');
      }
    }else{
      this.alert.withOutTranslate.onError('รหัสผ่านใหม่ต้องมีความยาว8-25 ตัวอักษร.');
    }
  }

  save() {
    var userid = this.userData.userid;
    var firstname = this.profileForm.value.firstname;
    var lastname = this.profileForm.value.lastname;
    var phoneNumber = this.profileForm.value.phoneNumber;
    var email = this.profileForm.value.email;
    var contact = this.profileForm.value.contact;
    if(this.profileForm.valid){
      this.alert.withOutTranslate.onSuccessRe();
      this.service.editProfile(userid, firstname, lastname, phoneNumber, email, contact).subscribe(x => {
      })
    }
    else{
      this.alert.withOutTranslate.onError('ข้อมูลไม่ถูกต้อง.');
    }
  }
}
