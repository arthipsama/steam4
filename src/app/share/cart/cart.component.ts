import { ChangeDetectorRef, Component, ElementRef, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { productData } from 'src/app/models/product.model';
import { userData } from 'src/app/models/user.models';
import { AlertServiceService } from 'src/app/service/alert-service.service';
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
              private el: ElementRef,
              private alert: AlertServiceService){

  }

  ngOnInit(){
    this.colorService.backgroundColor$.subscribe((color) => {
      this.renderer.setStyle(this.el.nativeElement.ownerDocument.body, 'background-color', color);
    });
    let storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
        this.userData = JSON.parse(storedUserData);
    }
    this.calculate();
  }

  calculate(){
    this.service.cart(this.userData.userid).subscribe(x=>{
      this.userProducts = x;
      if(this.userProducts){
        this.rowTotal = this.userProducts.map((product:productData) => {
          if(product.saleprice){
            return product.saleprice * product.quantity;
          } else {
            return product.price * product.quantity;
          }
       });
      } 
      if(this.userProducts){
        this.totalprice = this.rowTotal.reduce((accumulator:any, currentValue:any) => accumulator + currentValue, 0);
      }
      if(this.userProducts.length > 0){
        this.haveItems = true;
      }else{
        this.haveItems = false;
      }
    })
  }

  gotomainpage(){
    this.router.navigate(['/mainpage']);
  }

  deleteProduct(i:any){
    this.service.deleteProduct(this.userProducts[i].productid, this.userProducts[i].ordersid).subscribe(x=>{
       if(x){
        location.reload();
        this.service.cart(this.userData.userid).subscribe(pd=>{
          this.userProducts = pd;           
          if(this.userProducts.length == 0){
            this.haveItems = false;
          }
          if(this.userProducts){
            this.rowTotal = this.userProducts.map((product:productData) => {
              if(product.saleprice){
                return product.saleprice * product.quantity;
              } else {
                return product.price * product.quantity;
              }
            });
            this.totalprice = this.rowTotal.reduce((accumulator:any, currentValue:any) => accumulator + currentValue, 0);
          }
        })
      }
    })
  }

  bank1(){
    this.payto = 1;
  }

  bank2(){
    this.payto = 2;
  }

  bank3(){
    this.payto = 3;
  }

  bank4(){
    this.payto = 4;
  }


  previewImage(event:any){
    var reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    }
    reader.readAsDataURL(event.target.files[0]);
  }

  payProduct(){
    if(this.imagePreview){
      this.service.payProduct(this.imagePreview, this.userData.userid, this.totalprice, this.userData.UserName, this.userProducts[0].ordersid).subscribe(x=>{
        if(x){
          this.router.navigate(['/inventory']);
        }
      })
    }
    else{
      this.alert.withOutTranslate.onError('กรุณาใส่รูปภาพสคริปต์การโอนเงิน');
    }
  }
}
