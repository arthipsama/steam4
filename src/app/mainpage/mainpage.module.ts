import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainpageComponent } from './mainpage.component';
import { ShareModule } from '../share/share.module';



@NgModule({
  declarations: [MainpageComponent],
  imports: [
    CommonModule,
    ShareModule
  ]
})
export class MainpageModule { }
