import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm!: FormGroup;
  constructor(private fb: FormBuilder,
              private service: AuthService){

  }

  ngonit(){

  }  

  initForm(){
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  submit(){
    console.log(this.loginForm);
    
    this.service.postlogin(this.loginForm).subscribe(x=>{

    })
  }
}
