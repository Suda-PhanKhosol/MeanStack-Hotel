import { Component, OnInit } from '@angular/core';
import { RoomstatusService } from '../../services/roomstatus/roomstatus.service'

@Component({
  selector: 'app-show-room-status',
  templateUrl: './show-room-status.component.html',
  styleUrls: ['./show-room-status.component.css']
})
export class ShowRoomStatusComponent implements OnInit {

  RoomStatus: any
  constructor(private rss: RoomstatusService) { }



  ngOnInit(): void {
  }

  onLoading(){
    try{
      this.rss.getRoomStatus().subscribe(
        data => {
          this.rss = data;
        },
        err => {
          console.log(err)
        });
    }catch (error){
      console.log(error)
    }
  }


}
