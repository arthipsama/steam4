import { ChangeDetectorRef, Component, ElementRef, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { productData } from 'src/app/models/product.model';
import { userData } from 'src/app/models/user.models';
import { ColorService } from 'src/app/service/color.service';
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
  payto!: number
  imagePreview!: string;

  constructor(private router: Router,
              private service: ProductService,
              private colorService: ColorService ,
              private renderer: Renderer2, 
              private el: ElementRef){

  }

  ngOnInit(){
    this.colorService.backgroundColor$.subscribe((color) => {
      this.renderer.setStyle(this.el.nativeElement.ownerDocument.body, 'background-color', color);
    });
    
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

  bank1(){
    this.payto = 1;
    console.log(this.payto);
  }

  bank2(){
    this.payto = 2;
    console.log(this.payto);

  }

  bank3(){
    this.payto = 3;
    console.log(this.payto);

  }

  bank4(){
    this.payto = 4;
    console.log(this.payto);

  }


  previewImage(event:any){
      var reader = new FileReader();
      reader.onload = () => {
          this.imagePreview = reader.result as string;
          console.log(this.imagePreview);
      }
      reader.readAsDataURL(event.target.files[0]);
  }
}
