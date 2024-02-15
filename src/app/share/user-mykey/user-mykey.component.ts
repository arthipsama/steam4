import { Component, ElementRef, EventEmitter, Input, Output, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { userData } from 'src/app/models/user.models';
import { ColorService } from 'src/app/service/color.service';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-user-mykey',
  templateUrl: './user-mykey.component.html',
  styleUrls: ['./user-mykey.component.scss']
})
export class UserMykeyComponent {
  userData!: userData;
  myKeyData: any;

  constructor(private router: Router,
    private serviceProduct: ProductService,
    private colorService: ColorService,
    private renderer: Renderer2, 
    private el: ElementRef){}

  ngOnInit(){
    this.currentPage = 1;
    this.colorService.backgroundColor$.subscribe((color) => {
      this.renderer.setStyle(this.el.nativeElement.ownerDocument.body, 'background-color', color);
    });
    let storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
        this.userData = JSON.parse(storedUserData);
    }

    this.serviceProduct.getMykey(this.userData.userid).subscribe(x=>{
      this.myKeyData = x;
      this.recordCount = this.myKeyData.length;
    })
  }

  logout() {
    localStorage.removeItem('userData');
    this.router.navigate(['/mainpage']);
  }

  @Input() currentPage = 1;
  @Input() recordCount : number = 0;
  @Output() pageChange = new EventEmitter();
  itemsPerPage: number = 5; 

  pageChanged(event: any): void {
    this.currentPage = event;
    // console.log('pageChanged ' ,event);
    this.pageChange.emit(this.currentPage);
  }
}
