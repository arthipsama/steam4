import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainpageComponent } from './mainpage/mainpage.component';
import { ShareModule } from './share/share.module';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { AdminModule } from './admin/admin.module';

@NgModule({
  declarations: [
    AppComponent,
    MainpageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ShareModule,
    HttpClientModule,
    NgbModule,
    FormsModule,
    AdminModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
