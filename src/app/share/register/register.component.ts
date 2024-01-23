import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  registerForm!: FormGroup;
  user: any []=[];

  constructor(private fb: FormBuilder,
              private service: AuthService){

  }

  ngOnInit(){
    this.initForm();
  }  

  initForm(){
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      phoneNumber: '',
      email: ['', Validators.required, Validators.email],
      contact: ''
    })
  }

  submit(){    
    var username = this.registerForm.value.username;
    var password = this.registerForm.value.password;
    var firstname = this.registerForm.value.firstname;
    var lastname = this.registerForm.value.lastname;
    var phoneNumber = this.registerForm.value.phoneNumber;
    var email = this.registerForm.value.email;
    var contact = this.registerForm.value.contact;
    this.service.postregister(username, password, firstname, lastname, phoneNumber, email, contact).subscribe(x=>{
      console.log(x);
    })
  }
}
