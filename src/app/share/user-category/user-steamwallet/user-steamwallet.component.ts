import { Component, ElementRef, Renderer2 } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ColorService } from 'src/app/service/color.service';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-user-steamwallet',
  templateUrl: './user-steamwallet.component.html',
  styleUrls: ['./user-steamwallet.component.scss']
})
export class UserSteamwalletComponent {
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
    this.serviceKeygame.getProductSteamwallet().subscribe(x=>{
      this.product = x;
      this.product.forEach((product: any) => {
        if (product.saleprice) {
          const discountPercentage = ((product.price - product.saleprice) / product.price) *  100;
          product.percent = Math.round(discountPercentage);
        }
      });
    })
  }

  gotoDetaileProduct(index:any){
    localStorage.setItem('productData', JSON.stringify(this.product[index]));
    this.router.navigate(['/product-detail'+'/'+this.product[index].ProductName]);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
