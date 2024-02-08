import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainpageComponent } from './mainpage/mainpage.component';
import { LoginComponent } from './share/login/login.component';
import { RegisterComponent } from './share/register/register.component';
import { CartComponent } from './share/cart/cart.component';
import { ProfileComponent } from './share/profile/profile.component';
import { CardProductComponent } from './share/card-product/card-product.component';
import { AdminComponent } from './admin/admin.component';
import { ProductDetailComponent } from './share/product-detail/product-detail.component';
import { AccountComponent } from './admin/account/account.component';
import { ContactComponent } from './admin/contact/contact.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { NewComponent } from './admin/new/new.component';
import { OrderComponent } from './admin/order/order.component';
import { ProductComponent } from './admin/product/product.component';
import { SettingComponent } from './admin/setting/setting.component';
import { QaComponent } from './qa/qa.component';
import { AccountDetailComponent } from './admin/account/account-detail/account-detail.component';
import { ProductAdminDetailComponent } from './admin/product/product-admin-detail/product-admin-detail.component';
import { ContentAdminDetailComponent } from './admin/new/content-admin-detail/content-admin-detail.component';
import { OrderAdminDetailComponent } from './admin/order/order-admin-detail/order-admin-detail.component';
import { UserInventoryComponent } from './share/user-inventory/user-inventory.component';
import { UserMykeyComponent } from './share/user-mykey/user-mykey.component';
import { UserContactmeComponent } from './share/user-contactme/user-contactme.component';
import { UserAllproductComponent } from './share/user-category/user-allproduct/user-allproduct.component';
import { UserIdgameComponent } from './share/user-category/user-idgame/user-idgame.component';
import { UserKeygameComponent } from './share/user-category/user-keygame/user-keygame.component';
import { UserProgramComponent } from './share/user-category/user-program/user-program.component';
import { UserSteamwalletComponent } from './share/user-category/user-steamwallet/user-steamwallet.component';



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
    path: 'product-detail/:id',
    component: ProductDetailComponent
  },
  {
    path: 'questions',
    component: QaComponent
  },
  {
    path: 'inventory',
    component: UserInventoryComponent
  },
  {
    path: 'mykey',
    component: UserMykeyComponent
  },
  {
    path: 'contactme',
    component: UserContactmeComponent
  },
  {
    path: 'allproduct/:id',
    component: UserAllproductComponent
  },
  {
    path: 'idgame',
    component: UserIdgameComponent
  },
  {
    path: 'keygame',
    component: UserKeygameComponent
  },
  {
    path: 'program',
    component: UserProgramComponent
  },
  {
    path: 'steamwallet',
    component: UserSteamwalletComponent
  },
  {
    path: 'admin',
    component: AdminComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'user', component: AccountComponent },
      { path: 'user-detail/:id', component: AccountDetailComponent},
      { path: 'product', component: ProductComponent },
      { path: 'product-admin-detail/:id', component: ProductAdminDetailComponent},
      { path: 'new', component: NewComponent },
      { path: 'new-admin-detail/:id', component: ContentAdminDetailComponent },
      { path: 'order', component: OrderComponent },
      { path: 'order-admin-detail/:id', component: OrderAdminDetailComponent },
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
