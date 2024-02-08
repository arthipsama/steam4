import { Component, ElementRef, HostListener, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ColorService } from 'src/app/service/color.service';

@Component({
  selector: 'app-authorized',
  templateUrl: './authorized.component.html',
  styleUrls: ['./authorized.component.scss']
})
export class AuthorizedComponent implements OnInit {



  @ViewChild('eyeSvg', { static: true }) eyeSvg!: ElementRef;

  constructor(private renderer: Renderer2 , 
    private router: Router,
    private colorService: ColorService ,
    private el: ElementRef,
    ) {}

  ngOnInit() {
    this.colorService.backgroundColor$.subscribe((color) => {
      // ใช้ Renderer2 เพื่อตั้งค่าสีพื้นหลังของ body
      const backgroundColor = color || '#342643'; // ถ้า color เป็น falsy ให้ใช้ '#342643'
      this.renderer.setStyle(this.el.nativeElement.ownerDocument.body, 'background-color', backgroundColor);
    });
    
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent): void {
    this.updateEyePosition(event.clientX, event.clientY);
  }

  @HostListener('document:touchmove', ['$event'])
  onTouchMove(event: TouchEvent): void {
    const touch = event.touches[0];
    this.updateEyePosition(touch.clientX, touch.clientY);
  }

  private updateEyePosition(x: number, y: number): void {
    const svg = this.eyeSvg.nativeElement;
    const cx = 115 + 30 * (x / window.innerWidth);
    const cy = 50 + 30 * (y / window.innerHeight);

    this.renderer.setAttribute(svg.getElementById('eyef'), 'cx', cx.toString());
    this.renderer.setAttribute(svg.getElementById('eyef'), 'cy', cy.toString());
  }

  gotomainpage(){
    this.router.navigate(['/mainpage']);
  }

}
