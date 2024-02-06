import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainpageComponent } from './mainpage/mainpage.component';
import { ShareModule } from './share/share.module';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { AdminModule } from './admin/admin.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { LayoutModule } from '@progress/kendo-angular-layout';
import { DropDownButtonModule } from '@progress/kendo-angular-buttons';
import { QaModule } from './qa/qa.module';
import { QaComponent } from './qa/qa.component';
import { DialogModule } from '@angular/cdk/dialog';
import { NgxPaginationModule } from 'ngx-pagination';


@NgModule({
  declarations: [
    AppComponent,
    MainpageComponent,
    QaComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ShareModule,
    HttpClientModule,
    NgbModule,
    FormsModule,
    AdminModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatCardModule,
    MatToolbarModule,
    MatButtonModule,
    NgxChartsModule,
    LayoutModule,
    DropDownButtonModule,
    NgxPaginationModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas:[ CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
