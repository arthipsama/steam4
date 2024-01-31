import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { productData } from 'src/app/models/product.model';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent {

  product! :productData;
  constructor(private service: ProductService,
              private router: Router){
  }

  ngOnInit(){
    const storedProduct = localStorage.getItem('productData');
    if (storedProduct) {
        this.product = JSON.parse(storedProduct);
    }
  }

  buyProduct(){
    console.log(this.product);
    
    
    this.router.navigate(['/cart']);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
