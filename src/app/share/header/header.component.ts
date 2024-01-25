import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { userData } from 'src/app/models/user.models';
import { AuthService } from 'src/app/service/auth.service';

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
  constructor(private service: AuthService) {
  }

  ngOnInit(): void {      
    let storedUserData = sessionStorage.getItem('userData');
    if (storedUserData) {
        this.userData = JSON.parse(storedUserData);
        this.loging = true;
    }
  }

  searchProducts() {
  }

  nextProducts() {
  }
}
