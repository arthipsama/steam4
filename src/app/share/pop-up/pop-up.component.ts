import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { userData } from 'src/app/models/user.models';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-pop-up',
  templateUrl: './pop-up.component.html',
  styleUrls: ['./pop-up.component.scss']
})
export class PopUpComponent {
  userData!: userData;
  inventory: any;
  
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private serviceProduct: ProductService) {}

  ngOnInit(){
    let storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
        this.userData = JSON.parse(storedUserData);
    }
    this.serviceProduct.getInventory(this.userData.userid).subscribe(x=>{
      this.inventory = x;
    })
  }
}
