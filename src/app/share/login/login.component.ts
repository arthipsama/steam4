import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  user: any []=[];

  constructor(private fb: FormBuilder,
              private service: AuthService){

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
      console.log(x);
    })
  }
}
