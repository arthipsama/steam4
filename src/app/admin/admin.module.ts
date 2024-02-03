import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ShareModule } from '../share/share.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AccountComponent } from './account/account.component';
import { ProductComponent } from './product/product.component';
import { NewComponent } from './new/new.component';
import { OrderComponent } from './order/order.component';
import { ContactComponent } from './contact/contact.component';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from '../app-routing.module';
import { SettingComponent } from './setting/setting.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { MatDialogModule } from '@angular/material/dialog';
import { PopUpUserComponent } from './account/pop-up-user/pop-up-user.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { AccountDetailComponent } from './account/account-detail/account-detail.component';
import { FooterAdminComponent } from './footer-admin/footer-admin.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PopUpContactComponent } from './contact/pop-up-contact/pop-up-contact.component';
import { PopUpProductComponent } from './product/pop-up-product/pop-up-product.component';
import { ProductDetailComponent } from './product/product-detail/product-detail.component';



@NgModule({
  declarations: [
    AdminComponent,
    DashboardComponent,
    AccountComponent,
    ProductComponent,
    NewComponent,
    OrderComponent,
    ContactComponent,
    SettingComponent,
    PopUpUserComponent,
    AccountDetailComponent,
    FooterAdminComponent,
    PopUpContactComponent,
    PopUpProductComponent,
    ProductDetailComponent
  ],
  imports: [
    CommonModule,
    ShareModule,
    HttpClientModule,
    NgbModule,
    BrowserModule,
    AppRoutingModule,
    FlexLayoutModule,
    MatCardModule,
    MatToolbarModule,
    MatButtonModule,
    NgxChartsModule,
    PopoverModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    BrowserAnimationsModule
    
  ]
})
export class AdminModule { }
