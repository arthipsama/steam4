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
    path: 'admin',
    component: AdminComponent
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
