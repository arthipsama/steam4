import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ShareModule } from '../share/share.module';
import { FormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AccountComponent } from './account/account.component';
import { ProductComponent } from './product/product.component';
import { NewComponent } from './new/new.component';
import { OrderComponent } from './order/order.component';
import { ContactComponent } from './contact/contact.component';



@NgModule({
  declarations: [
    AdminComponent,
    DashboardComponent,
    AccountComponent,
    ProductComponent,
    NewComponent,
    OrderComponent,
    ContactComponent
  ],
  imports: [
    CommonModule,
    ShareModule,
    HttpClientModule,
    NgbModule,
  ]
})
export class AdminModule { }
