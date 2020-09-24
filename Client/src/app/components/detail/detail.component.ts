import { Component, OnInit } from "@angular/core";
import { LocalStorage, LocalStorageService } from "angular-web-storage";
import { RoomService } from "src/app/services/room/room.service";
import { Router } from "@angular/router";
@Component({
  selector: "app-detail",
  templateUrl: "./detail.component.html",
  styleUrls: ["./detail.component.css"],
})
export class DetailComponent implements OnInit {
  // variables
  product: any;
  token: string;
  constructor(
    public local: LocalStorageService,
    private room: RoomService,
    private router: Router
  ) {
    try {
      // check ว่า token มีใน DB ไหม เราจะเอาไป check ส่วน admin ด้วย
      // และ check  หน้าที่ต้อง login
      this.token = this.local.get("user").token;
      this.room.getAllRoom(this.token).subscribe(
        (data) => {
          this.room = data;
        },
        (err) => {
          this.router.navigate(["/detail"]);
        }
      );
    } catch (error) {
      console.log(error);
      this.router.navigate(["/detail"]);
    }
  }

  ngOnInit(): void {}
}
