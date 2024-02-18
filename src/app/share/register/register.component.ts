import { Component, ElementRef, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertServiceService } from 'src/app/service/alert-service.service';
import { AuthService } from 'src/app/service/auth.service';
import { ColorService } from 'src/app/service/color.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  registerForm!: FormGroup;
  user: any[] = [];
  registerValid: boolean = true;

  constructor(private fb: FormBuilder,
              private service: AuthService,
              private colorService: ColorService ,
              private renderer: Renderer2 , 
              private el: ElementRef,
              private router: Router,
              private alert: AlertServiceService) {

  }

  ngOnInit() {
    this.initForm();
    this.colorService.backgroundColor$.subscribe((color) => {
      // ใช้ Renderer2 เพื่อตั้งค่าสีพื้นหลังของ body
      this.renderer.setStyle(this.el.nativeElement.ownerDocument.body, 'background-color', color);
    });
  }

  initForm() {
    this.registerForm = this.fb.group({
      username: ["", [Validators.required, Validators.pattern(/^.{6,20}$/)]],
      password: ["", [Validators.required, Validators.pattern(/^.{8,24}$/)]],
      firstname: ["", [Validators.required]],
      lastname: "",
      phoneNumber: ["", [Validators.required, Validators.pattern('^[0-9]{1,10}$')]],
      email: ["", [Validators.required, Validators.email]],
      contact: ""
    })
  }

  submit() {
    var username = this.registerForm.value.username;
    var password = this.registerForm.value.password;
    var firstname = this.registerForm.value.firstname;
    var lastname = this.registerForm.value.lastname;
    var phoneNumber = this.registerForm.value.phoneNumber;
    var email = this.registerForm.value.email;
    var contact = this.registerForm.value.contact;
    if (this.registerForm.valid) {
      this.service.postregister(username, password, firstname, lastname, phoneNumber, email, contact).subscribe(x => {
        if (x == 1) {
          this.alert.withOutTranslate.onError('Username already exists');
          this.registerValid = false;
        }else if(x == 2){
          this.alert.withOutTranslate.onError('Email already exists');
          this.registerValid = false;
        }else if(x == 3){
          this.alert.withOutTranslate.onSuccess();
          this.router.navigate(['login']);
        }
      })
    } else {
      this.registerValid = false;
    }
  }
}
