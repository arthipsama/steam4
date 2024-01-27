import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {



    // responsivemenu 
    responsiveMenu:any;
    // responsivemaincontent
    responsiveContent:any;
    defaultStatus=true;
    openNav(status:any)
    {
      if(status===this.defaultStatus)
      {
        this.responsiveMenu = {
          'display':'block'
        }
        this.responsiveContent={
          'margin-left':'150px'
        }
        this.defaultStatus = false;
      }else
      {
        this.responsiveMenu = {
          'display':null
        }
        this.responsiveContent={
          'margin-left':null
        }
        this.defaultStatus=true;
      }
  
    }

}
