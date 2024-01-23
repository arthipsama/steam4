import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  products: any[] = [];
  searchTerm: string = '';
  public totalItem : number = 0;
  cartItemsCount: number = 0;
  nameUser:string = 'user@dmin'
  loging:boolean = false;

  constructor() {}

  ngOnInit(): void {

  }

  searchProducts() {



  }

  nextProducts() {
  }
}
