import { Component, ElementRef, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { ColorService } from 'src/app/service/color.service';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-user-mykey',
  templateUrl: './user-mykey.component.html',
  styleUrls: ['./user-mykey.component.scss']
})
export class UserMykeyComponent {

  constructor(private router: Router,
    private serviceProduct: ProductService,
    private colorService: ColorService,
    private renderer: Renderer2, 
    private el: ElementRef){}

  ngOnInit(){
    this.colorService.backgroundColor$.subscribe((color) => {
      this.renderer.setStyle(this.el.nativeElement.ownerDocument.body, 'background-color', color);
    });
  }

  logout() {
    localStorage.removeItem('userData');
    this.router.navigate(['/mainpage']);
  }
}
