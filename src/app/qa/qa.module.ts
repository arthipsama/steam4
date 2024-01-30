import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QaComponent } from './qa.component';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DropDownButtonModule } from '@progress/kendo-angular-buttons';
import { LayoutModule } from '@progress/kendo-angular-layout';
import { ShareModule } from '../share/share.module';



@NgModule({
  declarations: [
    
  ],
  imports: [
    CommonModule,
    RouterModule,
    NgbModule,
    DropDownButtonModule,
    LayoutModule,
    ShareModule,
    DropDownButtonModule,

  ],
  exports:[
    
  ],
})
export class QaModule { }
