import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './register/register.component';
import { CartComponent } from './cart/cart.component';
import { ProfileComponent } from './profile/profile.component';
import { CardProductComponent } from './card-product/card-product.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';



@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent,
    CartComponent,
    ProfileComponent,
    CardProductComponent,
    ProductDetailComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  exports:[
    HeaderComponent,
    FooterComponent,
    CardProductComponent
  ]
})
export class ShareModule { }
