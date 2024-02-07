import { Component, ElementRef, Renderer2 } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ColorService } from 'src/app/service/color.service';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-user-idgame',
  templateUrl: './user-idgame.component.html',
  styleUrls: ['./user-idgame.component.scss']
})
export class UserIdgameComponent {
  product: any;

  constructor(private colorService: ColorService ,
              private renderer: Renderer2, 
              private el: ElementRef,
              private fb: FormBuilder,
              private serviceKeygame: ProductService,
              private router: Router){}

  ngOnInit(){
    this.colorService.backgroundColor$.subscribe((color) => {
      this.renderer.setStyle(this.el.nativeElement.ownerDocument.body, 'background-color', color);
    });
    this.serviceKeygame.getProductIdgame().subscribe(x=>{
      this.product = x;
    })
  }

  gotoDetaileProduct(index:any){
    localStorage.setItem('productData', JSON.stringify(this.product[index]));
    this.router.navigate(['/product-detail'+'/'+this.product[index].ProductName]);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
