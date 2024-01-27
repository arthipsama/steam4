import { Component, OnInit } from '@angular/core';
import { RoomService } from '../service/room.service';
import { RoomDTO } from '../models/room.model';
import { AuthService } from '../service/auth.service';
import { productData } from '../models/product.model';

@Component({
  selector: 'app-mainpage',
  templateUrl: './mainpage.component.html',
  styleUrls: ['./mainpage.component.scss']
})
export class MainpageComponent implements OnInit {

  rooms: any[] = [];
  
  images = ['https://s.isanook.com/ga/0/ud/222/1112777/steamsale(5).jpg', 'https://s.isanook.com/ga/0/ud/222/1112777/steamsale(5).jpg', 'https://s.isanook.com/ga/0/ud/222/1112777/steamsale(5).jpg'];
  products!: productData[];

  constructor(private roomService: RoomService) {}

  ngOnInit() {
    // this.roomService.getRooms().subscribe((data) => {
    //   this.rooms = data;
    //   console.log(this.rooms);
    // });
  }

}
