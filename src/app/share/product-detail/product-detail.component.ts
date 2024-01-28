import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { productData } from 'src/app/models/product.model';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent {

  product! :productData;
  productData!: productData;
  constructor(private service: ProductService){
  }

  ngOnInit(){
    const storedProduct = localStorage.getItem('productData');
    if (storedProduct) {
        this.product = JSON.parse(storedProduct);
    }
  }

  buyProduct(){
    
  }
}
