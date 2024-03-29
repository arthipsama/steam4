import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { productData } from 'src/app/models/product.model';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-card-product',
  templateUrl: './card-product.component.html',
  styleUrls: ['./card-product.component.scss']
})
export class CardProductComponent {
  product: any;
  index: any;
  percent: any;
  offset =  10;
  limit =  10;
  // @Output() productChanged = new EventEmitter<productData[]>();

  constructor(private service: ProductService,
              private router: Router) {}

  ngOnInit(){
    this.service.getTenProduct(0, 10).subscribe(x=>{
      this.product = x;
      this.discountProduct()
    })
  }

  discountProduct(){
    this.product.forEach((product: any) => {
      if (product.saleprice) {
        const discountPercentage = ((product.price - product.saleprice) / product.price) *  100;
        product.percent = Math.round(discountPercentage);
      }
    });
  }

  loadMore(){
    this.service.getTenProduct(this.offset, this.limit).subscribe(newproduct => {
      this.product = [...this.product, ...newproduct];
      this.offset += this.limit;
    });
  }

  gotoDetaileProduct(index:any){
    // this.productChanged.emit(this.product[index]);
    localStorage.setItem('productData', JSON.stringify(this.product[index]));
    this.router.navigate(['/product-detail'+'/'+this.product[index].ProductName]);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    // localStorage.setItem('productData', JSON.stringify(this.product[index]));
  }
}
