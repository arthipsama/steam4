import { Location } from '@angular/common';
import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { userData } from 'src/app/models/user.models';
import { AlertServiceService } from 'src/app/service/alert-service.service';
import { AuthService } from 'src/app/service/auth.service';
import { ColorService } from 'src/app/service/color.service';
import { RoomService } from 'src/app/service/room.service';
import { trigger, state, transition, animate , style as angularAnimationStyle } from '@angular/animations';
import { AuthAdminService } from 'src/app/service/auth-admin.service';


@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss'],
  animations: [
    trigger('rotateAnimation', [
      state('start', angularAnimationStyle({ transform: 'rotate(0deg)' })),
      state('end', angularAnimationStyle({ transform: 'rotate(360deg)' })),
      transition('start <=> end', animate('1s ease-in-out')),
    ]),
  ],
})
export class SettingComponent implements OnInit {

  // userData:any | userData;
  displayEmail!: string;
  animationState: string = 'start';
  userForm!: FormGroup;
  userData: any;
  profileForm!: FormGroup;
  newUserData!: userData;
  newPassword: string = '';
  oldPassword: string = '';

  constructor( 
    private route: ActivatedRoute , 
    private router: Router,
    private alertService: AlertServiceService,
    private room: RoomService,
    private fb: FormBuilder,
    private location: Location,
    private service: AuthService,
    private colorService: ColorService ,
    private renderer: Renderer2, 
    private el: ElementRef,
    private authService: AuthAdminService,
    
    ) {

      this.userForm = this.fb.group({
        firstName: ['', Validators.required],
        lastName: [''],
        email: ['', [Validators.required, Validators.email]],
        phoneNumber: ['', Validators.required],
        password:['', Validators.required],
        role:['', Validators.required],
        contact:[''],
        // ... เพิ่มฟิลด์อื่น ๆ ตามต้องการ
      });
     }

  ngOnInit(): void {

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
      lastname: [this.newUserData.LastName || '', Validators.required],
      phoneNumber: this.newUserData.PhoneNumber || '',
      email: [this.newUserData.Email || '', Validators.email],
      contact: this.newUserData.Contact || '',
      password: this.newUserData.Password
    })
  }

  showPassword: boolean = false;

  // Method to toggle password visibility
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
    
  }

isSaveButtonDisabled(): boolean {
  return !this.profileForm.get('firstname')?.value ||
         !this.profileForm.get('email')?.value ||
         !this.profileForm.get('phoneNumber')?.value ||
         !this.profileForm.get('password')?.value;
}

onSave() {
  this.animationState = this.animationState === 'start' ? 'end' : 'start';
  var userid = this.userData.userid;
  var firstname = this.profileForm.value.firstname;
  var lastname = this.profileForm.value.lastname;
  var phoneNumber = this.profileForm.value.phoneNumber;
  var email = this.profileForm.value.email;
  var contact = this.profileForm.value.contact;
  var password = this.profileForm.value.password;
  if(this.profileForm.valid){
    this.alertService.onSuccessLogout();
    this.authService.editProfile(userid, firstname, lastname, phoneNumber, email, contact, password).subscribe(x => {
      // console.log(x);

    })
  }
  else{
    // console.log("ข้อมูลไม่ถูกต้อง");
  }
}

getImagePath(Role: string): string {
  return Role === 'ADMIN' ? '../assets/role/admin.png' : '../assets/role/user.png';
}

// onCancel() {
//   // ให้ย้อนกลับไปหน้าก่อนหน้านี้
//   this.location.back();
// }

// ตรวจสอบว่าข้อมูลทั้งหมดถูกกรอกให้ถูกต้องหรือไม่
isValidFormData(): boolean {
  return (
    this.newUserData.FirstName!== undefined &&
    this.newUserData.Email!== undefined &&
    this.newUserData.PhoneNumber!== undefined &&
    this.newUserData.Password!== undefined
  );
}

}
