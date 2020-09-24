import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class RoomstatusService {

  Status: any

  constructor(private http: HttpClient) {}

  RoomStatus(Status) {
    return this.http
      .post<any>("http://Localhost:3000/room/roomstatus", Status)
      .pipe(
        map((data) => {
          return data;
        })
      );
  }

  getRoomStatus(){
    return this.http.get<any>('http://localhost:3000/room/getroomstatus')
      .pipe(map(data=>{
        if(data) {
          this.Status = data;
          console.log(this.Status);
        }
        return this.Status;
      }));
  }
}
