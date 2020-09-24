import { Component, OnInit } from "@angular/core";
import { NgModule } from "@angular/core";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
  picEx4: string;
  picEx2: string;
  picEx3: string;

  constructor() {}

  ngOnInit(): void {
    this.picEx4 = "assets/pictureEX4.jpg";
    this.picEx2 = "assets/pictureEX2.jpg";
    this.picEx3 = "assets/pictureEX3.jpg";
  }
}
