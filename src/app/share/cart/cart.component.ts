import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent {
  haveItems: boolean = true;

  constructor(private router: Router){

  }

  ngOnInit(){
    
  }

  gotomainpage(){
    this.router.navigate(['/mainpage']);
  }
}
