import { Component, ElementRef, Renderer2 } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ColorService } from 'src/app/service/color.service';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-user-allproduct',
  templateUrl: './user-allproduct.component.html',
  styleUrls: ['./user-allproduct.component.scss']
})
export class UserAllproductComponent {
  product: any;

  constructor(private colorService: ColorService ,
              private renderer: Renderer2, 
              private el: ElementRef,
              private fb: FormBuilder,
              private serviceProduct: ProductService,
              private router: Router,
              private route: ActivatedRoute){}

  ngOnInit(){
    this.colorService.backgroundColor$.subscribe((color) => {
      this.renderer.setStyle(this.el.nativeElement.ownerDocument.body, 'background-color', color);
    });
    this.getDataProduct();
  }

  getDataProduct(){
    this.route.queryParams.subscribe(params => {
      const searchParam = params['search'];
      if(searchParam){
        this.serviceProduct.search(searchParam).subscribe(x=>{
          this.product = x;
        })
      }else{
        this.serviceProduct.getProduct().subscribe(x=>{
          this.product = x;
        })
      }
    });
  }

  gotoDetaileProduct(index:any){
    localStorage.setItem('productData', JSON.stringify(this.product[index]));
    this.router.navigate(['/product-detail'+'/'+this.product[index].ProductName]);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
