import { ChangeDetectorRef, Component } from '@angular/core';
import { Router } from '@angular/router';
import { productData } from 'src/app/models/product.model';
import { userData } from 'src/app/models/user.models';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent {
  haveItems: boolean = true;
  userData!: userData;
  userProducts: any;
  rowTotal:any;
  totalprice:any;

  constructor(private router: Router,
              private service: ProductService){

  }

  ngOnInit(){
    let storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
        this.userData = JSON.parse(storedUserData);
    }
    this.service.cart(this.userData.userid).subscribe(x=>{
      this.userProducts = x;
      if(this.userProducts){
        this.rowTotal = this.userProducts.map((product:productData) =>{
          return product.price * product.quantity
        }) 
      }
      if(this.userProducts){
        this.totalprice = this.rowTotal.reduce((accumulator:any, currentValue:any) => accumulator + currentValue, 0);
      }
    })
  }

  gotomainpage(){
    this.router.navigate(['/mainpage']);
  }

  payProduct(){
    
  }

  deleteProduct(i:any){
    this.service.deleteProduct(this.userProducts[i].productid, this.userProducts[i].ordersid).subscribe(x=>{
      if(x){
        this.service.cart(this.userData.userid).subscribe(pd=>{
          this.userProducts = pd;
        })
      }
    })
  }
}
