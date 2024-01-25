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
  userData!: userData;
  profileForm! : FormGroup;

  constructor(private router: Router,
              private fb: FormBuilder,
              private service: AuthService){
  }

  ngOnInit(){
    let storedUserData = sessionStorage.getItem('userData');
    if (storedUserData) {
      this.userData = JSON.parse(storedUserData);
    }
    console.log(this.userData);
    this.initForm()
  }

  initForm() {
    this.profileForm = this.fb.group({
      firstname: this.userData.FirstName,
      lastname: this.userData.LastName,
      phoneNumber: this.userData.PhoneNumber,
      email: [this.userData.Email, Validators.email],
      contact: this.userData.contact
    })
  }


  logout(){
    sessionStorage.removeItem('userData');
    this.router.navigate(['/mainpage']);
  }

  save(){
    
  }
}
