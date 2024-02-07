import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { RoomService } from '../service/room.service';
import { productData } from '../models/product.model';
import { ColorService } from '../service/color.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mainpage',
  templateUrl: './mainpage.component.html',
  styleUrls: ['./mainpage.component.scss']
})
export class MainpageComponent implements OnInit {

  rooms: any[] = [];
  img1 = 'https://cdn.discordapp.com/attachments/974891383087325254/1203287328840359986/1.png?ex=65d08ba7&is=65be16a7&hm=97b415620547378320bf96084f4bb66452792048d6c9e84fe6c673fd364cac6b&';
  img2 = 'https://cdn.discordapp.com/attachments/974891383087325254/1203287332065906719/2.png?ex=65d08ba7&is=65be16a7&hm=019c445b130db9ce75066e1b3b8afbcc3085f778ee7d9b03741a6882836d2197&';
  img3 = 'https://cdn.discordapp.com/attachments/974891383087325254/1203287342455070780/3.png?ex=65d08baa&is=65be16aa&hm=28b207978843b5200514dcef57ef540f5452e362b17b4250d3ed6d16542e0741&';
  images = [this.img1, this.img2, this.img3];
  products!: productData[];

  constructor(private roomService: RoomService , 
    private colorService: ColorService ,
    private renderer: Renderer2 , 
    private el: ElementRef, 
    private router: Router) {}

  ngOnInit() {
    this.colorService.backgroundColor$.subscribe((color) => {
      // ใช้ Renderer2 เพื่อตั้งค่าสีพื้นหลังของ body
      this.renderer.setStyle(this.el.nativeElement.ownerDocument.body, 'background-color', color);
    });
  }

  gotoKeygame(){
    this.router.navigate(['keygame']);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  gotoProgram(){
    this.router.navigate(['program']);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  gotoSteamwallet(){
    this.router.navigate(['steamwallet']);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  gotoIdgame(){
    this.router.navigate(['idgame']);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
