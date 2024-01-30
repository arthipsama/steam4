import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-qa',
  templateUrl: './qa.component.html',
  styleUrls: ['./qa.component.scss']
})
export class QaComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
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
