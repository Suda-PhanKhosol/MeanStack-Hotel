import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AddonService } from '../../services/addon/addon.service'
import { LocalStorageService } from "angular-web-storage";
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
@Component({
  selector: 'app-add-on',
  templateUrl: './add-on.component.html',
  styleUrls: ['./add-on.component.css']
})
export class AddOnComponent implements OnInit {
  token: any;
  id: number;

  constructor(private addon: AddonService,
    private router: Router,
    public local: LocalStorageService,
    private auth: AuthService) {
    try {
      this.token = this.local.get('user').token;
      console.log(this.token);
      this.auth.getRoomService(this.token).subscribe(
        data => {
          if (data) {

          } else {
            this.router.navigate(['/home'])
          }
        },
        err => {
          this.router.navigate(['/home'])
        }
      )
    } catch (error) {
      console.log(error);
      this.router.navigate(['/home'])
    }
  }

  ersForm = new FormGroup({
    roomid: new FormControl('', [Validators.required, Validators.pattern('[Aa][0-9]{3}')]),
    wifi: new FormControl(''),
    shuttle: new FormControl(''),
    tour: new FormControl(''),
    luandary: new FormControl(''),
    clean: new FormControl(''),
  });

  get roomid() {
    return this.ersForm.get('roomid');
  }


  ngOnInit(): void {
  }
  ers: any = [
    { "id": "1", "name": "WIFI service", "price": "100 Bath" },
    { "id": "2", "name": "Shuttle service", "price": "200 Bath" },
    { "id": "3", "name": "Tour guide service", "price": "1000 Bath" },
    { "id": "4", "name": "Laundry service", "price": "500 Bath" },
    { "id": "5", "name": "Clean service", "price": "800 Bath" }
  ]

  add() {
    this.ers.add(this.ersForm.value).subscribe(
      data => {
        console.log(data)
        alert('Add Extra Room Service succesfully');
        this.ersForm.reset();
      },
      err => {
        console.log(err);
      });
  }
  previewLoaded: boolean = false;

  resetForm() {
    this.ersForm.reset();
    this.previewLoaded = false;
  }
}
