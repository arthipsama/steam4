import { Component, ElementRef, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  constructor(private fb: FormBuilder,
    private service: AuthService,
    private colorService: ColorService ,
    private renderer: Renderer2 , 
    private el: ElementRef) {

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
      username: "",
      password: "",
      firstname: "",
      lastname: "",
      phoneNumber: "",
      email: ["", Validators.email],
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
      this.service.postregister(username, password, firstname, lastname, phoneNumber, email, contact).subscribe(x => {
        if (x) {
          console.log(x, "register สำเร็จ");
        }
      })
  }

}
