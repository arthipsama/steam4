import { Component, ElementRef, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { userData } from 'src/app/models/user.models';
import { ColorService } from 'src/app/service/color.service';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-user-inventory',
  templateUrl: './user-inventory.component.html',
  styleUrls: ['./user-inventory.component.scss']
})
export class UserInventoryComponent {
  userData!:userData;
  userInventory:any;
  constructor(private router: Router,
              private serviceProduct: ProductService,
              private colorService: ColorService,
              private renderer: Renderer2, 
              private el: ElementRef){}

  ngOnInit(){
    this.colorService.backgroundColor$.subscribe((color) => {
      this.renderer.setStyle(this.el.nativeElement.ownerDocument.body, 'background-color', color);
    });
    this.getuserDataFromLocal();
    if(this.userData){
      this.serviceProduct.getInventory(this.userData.userid).subscribe(x=>{
        this.userInventory = x;
      })
    }
  }

  getuserDataFromLocal(){
    let storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
        this.userData = JSON.parse(storedUserData);
    }
  }

  logout() {
    localStorage.removeItem('userData');
    this.router.navigate(['/mainpage']);
  }
}
