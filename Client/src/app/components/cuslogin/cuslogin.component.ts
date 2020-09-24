import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { Router } from "@angular/router";
import { SinginService } from "../../services/singin/singin.service";

@Component({
  selector: "app-cuslogin",
  templateUrl: "./cuslogin.component.html",
  styleUrls: ["./cuslogin.component.css"],
})
export class CusloginComponent implements OnInit {
  authForm = new FormGroup({
    Email: new FormControl(""),
    Password: new FormControl(""),
  });

  constructor(private router: Router, private login: SinginService) {}

  ngOnInit(): void {}
  // fuction
  signinCustomer() {
    console.log("this.authForm.value:  \n");
    console.log(this.authForm.value);
    this.login.signIn(this.authForm.value).subscribe(
      (data) => {
        if (data.status == true) {
          this.router.navigate(["/detail"]);
        } else {
          alert("Email or Password is incorrect!");
        }
      },
      (err) => {
        console.log(err);
        alert("Email or Password is incorrect!");
      }
    );
  }
}
