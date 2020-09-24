import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
@Injectable({
  providedIn: "root",
})
export class RoomService {
  constructor(private http: HttpClient) {}
  // variables
  rooms: any;
  // fuctions
  // fuction ที่ check ว่า token มีไหม
  getAllRoom(token: any) {
    const headers = { Authorization: token };
    return this.http
      .get<any>("http://localhost:3000/api/rooms", { headers })
      .pipe(
        map((data) => {
          if (data) {
            this.rooms = data;
          }
          // อยู่ใน fuction map ตั้ง return ค่า
          return data;
        })
      );
  }
}
