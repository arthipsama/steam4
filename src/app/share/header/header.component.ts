import { Component, Input, OnInit } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { userData } from 'src/app/models/user.models';
import { AuthService } from 'src/app/service/auth.service';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{
  products: any[] = [];
  searchTerm: string = '';
  public totalItem : number = 0;
  cartItemsCount: number = 0;
  loging:boolean = false;
  userData!: userData;
  productnum:number = 0;
  dataSearch!:string;

  constructor(private serviceProduct: ProductService) {
  }

  ngOnInit(): void {      
    let storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
        this.userData = JSON.parse(storedUserData);
        this.loging = true;
    }
    this.chackProductNum();
  }

  chackProductNum(){
    if(this.loging == true){
      this.serviceProduct.orders(this.userData.userid).subscribe(x=>{
        if (x && x.length > 0) {
          x.forEach((num:any) => {
            this.productnum++
          });
         }
      })
    }
  }

  searchProducts(dataSearch:string) {
    this.serviceProduct.search(dataSearch).subscribe(x=>{
      this.serviceProduct.sendSearchResults(x);
    })
  }

  nextProducts() {
  }

  logout(){
    localStorage.removeItem('userData');
  }
}
