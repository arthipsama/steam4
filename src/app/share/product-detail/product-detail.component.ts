import { Component, ElementRef, Renderer2 } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { productData } from 'src/app/models/product.model';
import { userData } from 'src/app/models/user.models';
import { ColorService } from 'src/app/service/color.service';
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
  percent!: number;

  constructor(private service: ProductService,
              private router: Router,
              private colorService: ColorService ,
              private renderer: Renderer2, 
              private el: ElementRef) {
  }

  ngOnInit() {
    this.colorService.backgroundColor$.subscribe((color) => {
      this.renderer.setStyle(this.el.nativeElement.ownerDocument.body, 'background-color', color);
    });

    const storedProduct = localStorage.getItem('productData');
    if (storedProduct) {
      this.product = JSON.parse(storedProduct);
      this.discountProduct();
    }
    let storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
      this.userData = JSON.parse(storedUserData);
    }
  }

  discountProduct(){
    if (this.product.saleprice) {
      const discountPercentage = ((this.product.price - this.product.saleprice) / this.product.price) * 100;
      this.percent = Math.round(discountPercentage);
    }
  };
  

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
    if(this.product.saleprice){
      var price = this.product.saleprice * this.quantity
    }else{
      var price = this.product.price * this.quantity
    }
    
    this.service.addCart(userid, productid, Quantity, price).subscribe(x=>{
      this.router.navigate(['/cart']);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    })
  }
}
