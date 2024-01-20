import { Component, OnInit } from '@angular/core';
import { RoomService } from '../service/room.service';
import { RoomDTO } from '../models/room.model';

@Component({
  selector: 'app-mainpage',
  templateUrl: './mainpage.component.html',
  styleUrls: ['./mainpage.component.scss']
})
export class MainpageComponent implements OnInit {

  rooms: any[] = [];

  constructor(private roomService: RoomService) {}

  ngOnInit() {
    this.roomService.getRooms().subscribe((data) => {
      this.rooms = data;
      console.log(this.rooms);
      
    });
  }
}
