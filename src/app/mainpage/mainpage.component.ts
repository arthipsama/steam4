import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { RoomService } from '../service/room.service';
import { productData } from '../models/product.model';
import { ColorService } from '../service/color.service';

@Component({
  selector: 'app-mainpage',
  templateUrl: './mainpage.component.html',
  styleUrls: ['./mainpage.component.scss']
})
export class MainpageComponent implements OnInit {

  rooms: any[] = [];
  
  images = ['https://s.isanook.com/ga/0/ud/222/1112777/steamsale(5).jpg', 'https://s.isanook.com/ga/0/ud/222/1112777/steamsale(5).jpg', 'https://s.isanook.com/ga/0/ud/222/1112777/steamsale(5).jpg'];
  products!: productData[];

  constructor(private roomService: RoomService , private colorService: ColorService ,
    private renderer: Renderer2 , private el: ElementRef) {}

  ngOnInit() {
    this.colorService.backgroundColor$.subscribe((color) => {
      // ใช้ Renderer2 เพื่อตั้งค่าสีพื้นหลังของ body
      this.renderer.setStyle(this.el.nativeElement.ownerDocument.body, 'background-color', color);
    });
    
  }
  

}
