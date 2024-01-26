import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { userData } from 'src/app/models/user.models';
import { AuthService } from 'src/app/service/auth.service';

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
    private service: AuthService) {
  }

  ngOnInit() {
    let storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
      this.userData = JSON.parse(storedUserData);
    }
    this.initForm()
  }

  initForm() {
    this.profileForm = this.fb.group({
      firstname: this.userData.FirstName,
      lastname: this.userData.LastName,
      phoneNumber: this.userData.PhoneNumber,
      email: [this.userData.Email, Validators.email],
      contact: this.userData.Contact
    })
  }

  logout() {
    sessionStorage.removeItem('userData');
    this.router.navigate(['/mainpage']);
  }

  save() {
    var userid = this.userData.userid;
    var firstname = this.profileForm.value.firstname;
    var lastname = this.profileForm.value.lastname;
    var phoneNumber = this.profileForm.value.phoneNumber;
    var email = this.profileForm.value.email;
    var contact = this.profileForm.value.contact;
    this.service.editProfile(userid, firstname, lastname, phoneNumber, email, contact).subscribe(x => {
      console.log('edit เสร็จ');  
    })
    this.service.UserData(this.userData.userid).subscribe(x=>{
      this.newUserData = x;
      
    })
  }
}
