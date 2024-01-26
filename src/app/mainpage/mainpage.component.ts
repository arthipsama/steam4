import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { RoomService } from '../service/room.service';
import { RoomDTO } from '../models/room.model';
import { AuthService } from '../service/auth.service';
import { productData } from '../models/product.model';
import { ColorService } from '../service/color.service';

@Component({
  selector: 'app-mainpage',
  templateUrl: './mainpage.component.html',
  styleUrls: ['./mainpage.component.scss']
})
export class MainpageComponent implements OnInit {

  rooms: any[] = [];
  images = [941, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);
  products!: productData[];

  constructor(private roomService: RoomService , private colorService: ColorService ,
    private renderer: Renderer2 , private el: ElementRef) {}

  ngOnInit() {
    this.colorService.backgroundColor$.subscribe((color) => {
      // ใช้ Renderer2 เพื่อตั้งค่าสีพื้นหลังของ body
      this.renderer.setStyle(this.el.nativeElement.ownerDocument.body, 'background-color', color);
    });
    
  }
  

  receiveProduct(product: productData[]) {
    this.products = product;
    console.log(this.products);
    
}
}
