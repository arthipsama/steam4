import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { ColorService } from '../service/color.service';
import { RoomService } from '../service/room.service';

@Component({
  selector: 'app-qa',
  templateUrl: './qa.component.html',
  styleUrls: ['./qa.component.scss']
})
export class QaComponent implements OnInit {

  constructor(private roomService: RoomService , 
    private colorService: ColorService ,
    private renderer: Renderer2 , 
    private el: ElementRef,
    ) {}

  ngOnInit(): void {

    this.colorService.backgroundColor$.subscribe((color) => {
      // ใช้ Renderer2 เพื่อตั้งค่าสีพื้นหลังของ body
      this.renderer.setStyle(this.el.nativeElement.ownerDocument.body, 'background-color', color);
    });

  }

  public duration = 500;


  accordionItems = [
    { header: 'หัวข้อ Collapse 1', content: 'เนื้อหา Collapse 1', expanded: false },
    { header: 'หัวข้อ Collapse 2', content: 'เนื้อหา Collapse 2', expanded: false },
    // เพิ่ม accordion items ตามต้องการ
  ];

  toggleItem(item: any): void {
    item.expanded = !item.expanded;
  }
}
