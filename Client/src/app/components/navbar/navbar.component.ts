import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from "angular-web-storage";
import { Router } from '@angular/router';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  token: any;

  constructor(private router: Router,
    public local: LocalStorageService,) {

  }

  ngOnInit(): void {
  }



  logoutSystem() {
    this.local.clear();
    this.router.navigate(['/home']);
  }
}
