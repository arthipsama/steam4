import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RoomDTO } from 'src/app/models/room.model';
import { userData } from 'src/app/models/user.models';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm!: FormGroup;
  userData: any;
  constructor(private fb: FormBuilder,
              private service: AuthService,
              private router: Router){

  }

  ngOnInit(){
    this.initForm();
  }  

  initForm(){
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  submit(){
    var username = this.loginForm.value.username;
    var password = this.loginForm.value.password;
    
    this.service.postlogin(username, password).subscribe(x=>{
      this.userData = x;
      if(this.userData){
        this.router.navigate(['/mainpage']);
        this.service.outputUserData(this.userData)
        sessionStorage.setItem('userData', JSON.stringify(this.userData));
      }
      else{
        console.log("login ไม่สำเร็จ");
      }
    })
  }
}
