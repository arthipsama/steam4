import { Component } from '@angular/core';
import { ColorService } from './service/color.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'front';
  constructor(private colorService: ColorService) {}

  // ให้ตั้งค่าสีเมื่อ component ถูกสร้าง
  ngOnInit(): void {
    this.colorService.setBackgroundColor('#272727');
  }
}
