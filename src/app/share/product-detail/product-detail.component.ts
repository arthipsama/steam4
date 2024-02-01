import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { productData } from 'src/app/models/product.model';
import { userData } from 'src/app/models/user.models';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent {
  userData!: userData;
  product!: productData;
  quantity: number = 1;

  constructor(private service: ProductService,
    private router: Router) {
  }

  ngOnInit() {
    const storedProduct = localStorage.getItem('productData');
    if (storedProduct) {
      this.product = JSON.parse(storedProduct);
    }
    let storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
      this.userData = JSON.parse(storedUserData);
    }
  }

  decreaseQuantity(): void {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  increaseQuantity(): void {
    if(this.product.quantity > this.quantity){
      this.quantity++;
    }
  }

  buyProduct() {
    var userid = this.userData.userid;
    var productid = this.product.productid;
    var Quantity = this.quantity;
    var price = this.product.price * this.quantity
    this.service.addCart(userid, productid, Quantity, price).subscribe(x=>{
      this.router.navigate(['/cart']);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    })
  }
}
