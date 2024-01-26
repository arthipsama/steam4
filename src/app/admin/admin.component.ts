import { Component, ElementRef, OnInit } from '@angular/core';
import { ColorService } from '../service/color.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  title = 'admindashboard';

  constructor(private el:ElementRef , private colorService: ColorService){}
  
  ngOnInit(): void {
    let alldrpdwn = document.querySelectorAll('.dropdow-container');
    console.log(alldrpdwn, 'alldrpdwn#');
    alldrpdwn.forEach((item: any) => {
      const a = item.parentElement?.querySelector('a:first-child');
      console.log(a, 'a#');
      a.addEventListener('click', (e: any) => {
        e.preventDefault();
        this.el.nativeElement.classList.toggle('active');
        item.classList.toggle('show');
      });
    });
  
    // ลบสีพื้นหลังของ component นี้
    this.responsiveContent = { 'background-color': null };
  }

  handleNotificationClick(){

  }
    
  handleSearchClick(){
    
  }

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

  arrowIconClassProducts = 'bi bi-arrow-right icon';
  bagIconClassProducts = 'bi bi-bag';

  arrowIconClassOther = 'bi bi-arrow-right icon';
  tagIconClassOther = 'bi bi-tag';

  toggleArrowAndBagIconsProducts() {
    this.arrowIconClassProducts = this.arrowIconClassProducts === 'bi bi-arrow-right icon' ? 'bi bi-arrow-left icon' : 'bi bi-arrow-right icon';
    this.bagIconClassProducts = this.bagIconClassProducts === 'bi bi-bag' ? 'bi bi-bag' : 'bi bi-bag';
  }

  toggleArrowAndTagIconsOther() {
    this.arrowIconClassOther = this.arrowIconClassOther === 'bi bi-arrow-right icon' ? 'bi bi-arrow-left icon' : 'bi bi-arrow-right icon';
    this.tagIconClassOther = this.tagIconClassOther === 'bi bi-tag' ? 'bi bi-tag' : 'bi bi-tag';
  }

}
