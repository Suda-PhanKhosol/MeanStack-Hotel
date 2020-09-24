import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RoomstatusService } from '../../services/roomstatus/roomstatus.service'

@Component({
  selector: 'app-room-status',
  templateUrl: './room-status.component.html',
  styleUrls: ['./room-status.component.css']
})
export class RoomStatusComponent implements OnInit {


  RoomID: string[] = ['R101','R102','R103']
  RoomType: string[] = ['Normal','VIP','Sweet']
  RoomStatus: string[] = ['Can Check in','Room has been Book','Other customer has been check in']
  RommStatusForm = new FormGroup({
    Rid: new FormControl((''),[Validators.required]),
    type: new FormControl((''),[Validators.required]),
    status: new FormControl((''),[Validators.required])


  })

  constructor(private rss: RoomstatusService) { }

  ngOnInit(): void {
  }

  get Rid(){
    return this.RommStatusForm.get('Rid');
  }

  get type(){
    return this.RommStatusForm.get('type');
  }

  get status(){
    return this.RommStatusForm.get('status');
  }

  ManegeStatus(){
    this.rss.RoomStatus(this.RommStatusForm.value).subscribe(
      data => {
        console.log(data)
        alert('Manege is successfully');
        this.RommStatusForm.reset();
      },
      err => {
        console.log(err);
      });
  }
  resetForm(){
    this.RommStatusForm.reset();
  }
}
