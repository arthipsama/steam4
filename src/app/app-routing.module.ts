import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainpageComponent } from './mainpage/mainpage.component';
import { LoginComponent } from './share/login/login.component';
import { RegisterComponent } from './share/register/register.component';
import { CartComponent } from './share/cart/cart.component';
import { ProfileComponent } from './share/profile/profile.component';
import { CardProductComponent } from './share/card-product/card-product.component';
import { AdminComponent } from './admin/admin.component';
import { AccountComponent } from './admin/account/account.component';
import { ContactComponent } from './admin/contact/contact.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { NewComponent } from './admin/new/new.component';
import { OrderComponent } from './admin/order/order.component';
import { ProductComponent } from './admin/product/product.component';
import { SettingComponent } from './admin/setting/setting.component';


const routes: Routes = [
  {
    path: 'mainpage',
    component: MainpageComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'cart',
    component: CartComponent
  },
  {
    path: 'profile',
    component: ProfileComponent
  },
  {
    path: 'product',
    component: CardProductComponent
  },
  {
    path: 'admin',
    component: AdminComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'user', component: AccountComponent },
      { path: 'product', component: ProductComponent },
      { path: 'new', component: NewComponent },
      { path: 'order', component: OrderComponent },
      { path: 'contact', component: ContactComponent },
      { path: 'setting', component: SettingComponent },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  },
  {
    path: '', redirectTo: 'mainpage', pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
