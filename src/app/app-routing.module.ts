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
import { RoleGuard } from './service/role.guard';
import { AuthorizedComponent } from './share/authorized/authorized.component';
import { UserContentComponent } from './share/user-content/user-content.component';

const adminRoutes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'user', component: AccountComponent },
  { path: 'user-detail/:id', component: AccountDetailComponent },
  { path: 'product', component: ProductComponent },
  { path: 'product-admin-detail/:id', component: ProductAdminDetailComponent },
  { path: 'new', component: NewComponent },
  { path: 'new-admin-detail/:id', component: ContentAdminDetailComponent },
  { path: 'order', component: OrderComponent },
  { path: 'order-admin-detail/:id', component: OrderAdminDetailComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'setting', component: SettingComponent },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
];

const routes: Routes = [
  {
    path: 'mainpage',
    component: MainpageComponent
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [RoleGuard],
    data: { requiredRole: 'ghost' }
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [RoleGuard],
    data: { requiredRole: 'ghost'}
  },
  {
    path: 'cart',
    component: CartComponent,
    canActivate: [RoleGuard],
    data: { requiredRole: ['ghost' , 'USER'] }
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [RoleGuard],
    data: { requiredRole: 'USER' }
  },
  {
    path: 'product-detail/:id',
    component: ProductDetailComponent,
    canActivate: [RoleGuard],
    data: { requiredRole: ['ghost' , 'USER'] }
  },
  {
    path: 'questions',
    component: QaComponent,
    canActivate: [RoleGuard],
    data: { requiredRole: ['ghost' , 'USER'] }
  },
  {
    path: 'inventory',
    component: UserInventoryComponent,
    canActivate: [RoleGuard],
    data: { requiredRole: 'USER' }
  },
  {
    path: 'mykey',
    component: UserMykeyComponent,
    canActivate: [RoleGuard],
    data: { requiredRole: 'USER' }
  },
  {
    path: 'contactme',
    component: UserContactmeComponent,
    canActivate: [RoleGuard],
    data: { requiredRole: 'USER' }
  },
  {
    path: 'allproduct/:id',
    component: UserAllproductComponent,
    canActivate: [RoleGuard],
    data: { requiredRole: ['ghost' , 'USER'] }
  },
  {
    path: 'idgame',
    component: UserIdgameComponent,
    canActivate: [RoleGuard],
    data: { requiredRole: ['ghost' , 'USER'] }
  },
  {
    path: 'keygame',
    component: UserKeygameComponent,
    canActivate: [RoleGuard],
    data: { requiredRole: ['ghost' , 'USER'] }
  },
  {
    path: 'program',
    component: UserProgramComponent,
    canActivate: [RoleGuard],
    data: { requiredRole: ['ghost' , 'USER'] }
  },
  {
    path: 'steamwallet',
    component: UserSteamwalletComponent,
    canActivate: [RoleGuard],
    data: { requiredRole: ['ghost' , 'USER'] }
  },
  {
    path: 'content',
    component: UserContentComponent,
    canActivate: [RoleGuard],
    data: { requiredRole: ['ghost' , 'USER'] }
  },
  {
    path: 'rolepage',
    component: AuthorizedComponent
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [RoleGuard],
    data: { requiredRole: 'ADMIN' },
    children: adminRoutes
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
