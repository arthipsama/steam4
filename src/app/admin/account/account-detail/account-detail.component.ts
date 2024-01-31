import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { userData } from 'src/app/models/user.models';
import { AlertServiceService } from 'src/app/service/alert-service.service';
import { RoomService } from 'src/app/service/room.service';

@Component({
  selector: 'app-account-detail',
  templateUrl: './account-detail.component.html',
  styleUrls: ['./account-detail.component.scss']
})
export class AccountDetailComponent implements OnInit {
  userData:any | userData;


  constructor( 
    private route: ActivatedRoute , 
    private alertService: AlertServiceService,
    private room: RoomService,
    private fb: FormBuilder,
    ) { }


  ngOnInit(): void {

    let userid  = this.route.snapshot.paramMap.get('id');
    console.log("uses id is",userid)

    userid && this.room.getuserbyid(userid).subscribe((res)=>{
      this.userData = res;
      console.log(res)

    
    })
    
  }

}
