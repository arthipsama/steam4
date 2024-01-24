import { Component, OnInit } from '@angular/core';
import { RoomService } from '../service/room.service';
import { RoomDTO } from '../models/room.model';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-mainpage',
  templateUrl: './mainpage.component.html',
  styleUrls: ['./mainpage.component.scss']
})
export class MainpageComponent implements OnInit {

  rooms: any[] = [];
  images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);
  constructor(private roomService: RoomService) {}

  ngOnInit() {
    this.roomService.getRooms().subscribe((data) => {
      this.rooms = data;
      console.log(this.rooms);
      
    });
  }
}
