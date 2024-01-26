import { Component, EventEmitter, Output } from '@angular/core';
import { productData } from 'src/app/models/product.model';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-card-product',
  templateUrl: './card-product.component.html',
  styleUrls: ['./card-product.component.scss']
})
export class CardProductComponent {
  product: any;
  @Output() productChanged = new EventEmitter<productData[]>();

  constructor(private service: ProductService) {}

  ngOnInit(){
    this.service.getProduct().subscribe(x=>{
      this.product = x;
      this.productChanged.emit(this.product);
    })
  }
}
