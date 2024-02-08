import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './register/register.component';
import { CartComponent } from './cart/cart.component';
import { ProfileComponent } from './profile/profile.component';
import { CardProductComponent } from './card-product/card-product.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import {MatDialogModule} from '@angular/material/dialog';
import { PopUpComponent } from './pop-up/pop-up.component';
import { BrowserModule } from '@angular/platform-browser';
import { ChatbotComponent } from './chatbot/chatbot.component';
import { PaginationComponent } from './pagination/pagination.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { UserInventoryComponent } from './user-inventory/user-inventory.component';
import { UserMykeyComponent } from './user-mykey/user-mykey.component';
import { UserContactmeComponent } from './user-contactme/user-contactme.component';
import { UserKeygameComponent } from './user-category/user-keygame/user-keygame.component';
import { UserProgramComponent } from './user-category/user-program/user-program.component';
import { UserSteamwalletComponent } from './user-category/user-steamwallet/user-steamwallet.component';
import { UserIdgameComponent } from './user-category/user-idgame/user-idgame.component';
import { UserAllproductComponent } from './user-category/user-allproduct/user-allproduct.component';
import { AuthorizedComponent } from './authorized/authorized.component';
import { UserContentComponent } from './user-content/user-content.component';



@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent,
    CartComponent,
    ProfileComponent,
    CardProductComponent,
    ProductDetailComponent,
    PopUpComponent,
    ChatbotComponent,
    PaginationComponent,
    UserInventoryComponent,
    UserMykeyComponent,
    UserContactmeComponent,
    UserKeygameComponent,
    UserProgramComponent,
    UserSteamwalletComponent,
    UserIdgameComponent,
    UserAllproductComponent,
    AuthorizedComponent,
    UserContentComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatDialogModule,
    FormsModule,
    BrowserModule,
    NgxPaginationModule,
    
  ],
  exports:[
    HeaderComponent,
    FooterComponent,
    CardProductComponent,
    UserContactmeComponent,
    PaginationComponent
  ],
  schemas:[ CUSTOM_ELEMENTS_SCHEMA]
})
export class ShareModule { }
