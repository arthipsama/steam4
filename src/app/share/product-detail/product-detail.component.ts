import { Component } from '@angular/core';
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
    this.service.getProdectData$().subscribe(x=>{
      this.product = x;
    })

    // let storedUserData = localStorage.getItem('productData');
    // if (storedUserData) {
    //     this.productData = JSON.parse(storedUserData);
    // }
  }
}
