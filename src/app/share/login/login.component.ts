import { Component, ElementRef, EventEmitter, Input, Output, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { RoomDTO } from 'src/app/models/room.model';
import { userData } from 'src/app/models/user.models';
import { AuthService } from 'src/app/service/auth.service';
import { ColorService } from 'src/app/service/color.service';
import { PopUpComponent } from '../pop-up/pop-up.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm!: FormGroup;
  userData: any;
  loginValid: boolean = false;
  constructor(private fb: FormBuilder,
              private service: AuthService,
              private router: Router,
              private colorService: ColorService ,
              private renderer: Renderer2 , 
              private el: ElementRef,
              private dialogRef: MatDialog){

  }

  ngOnInit(){
    this.initForm();
    this.colorService.backgroundColor$.subscribe((color) => {
      // ใช้ Renderer2 เพื่อตั้งค่าสีพื้นหลังของ body
      this.renderer.setStyle(this.el.nativeElement.ownerDocument.body, 'background-color', color);
    });

  }  

  initForm(){
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.pattern(/^.{6,20}$/)]],
      password: ['', [Validators.required, Validators.pattern(/^.{8,24}$/)]]
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
        localStorage.setItem('userData', JSON.stringify(this.userData));
      } else{
        this.loginValid = true;
      }   
      if (this.userData.Role === 'ADMIN') {
        this.router.navigate(['/admin']);
      } else if (this.userData.Role === 'USER') {
        this.router.navigate(['/mainpage']);
      }
    })
  }
}
