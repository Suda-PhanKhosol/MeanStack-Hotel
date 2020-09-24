import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ServiceService } from '../../services/service.service'
import { LocalStorageService } from "angular-web-storage";
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
@Component({
  selector: 'app-room-service',
  templateUrl: './room-service.component.html',
  styleUrls: ['./room-service.component.css']
})
export class RoomServiceComponent implements OnInit {

  foods: string[] = ['not accept', 'steak', 'hamberger', 'soup', 'chicken rice'];
  drinks: string[] = ['not accept', 'smoothie', 'coffee', 'tea', 'cola'];
  spas: string[] = ['not accept', 'fitness spa', 'mineral spring spa', 'medical spa'];

  token: any;
  serviceForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    roomid: new FormControl('', [Validators.required, Validators.pattern('[Aa][0-9]{3}')]),
    breakfast: new FormControl('', [Validators.required]),
    lunch: new FormControl('', [Validators.required]),
    dinner: new FormControl('', [Validators.required]),
    drink: new FormControl('', [Validators.required]),
    spa: new FormControl('', [Validators.required]),
    note: new FormControl('', [Validators.required]),
  });

  previewLoaded: boolean = false;

  constructor(private ss: ServiceService,
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

  ngOnInit(): void {
  }

  get roomid() {
    return this.serviceForm.get('roomid');
  }
  get name() {
    return this.serviceForm.get('name');
  }
  addService() {
    this.ss.addService(this.serviceForm.value).subscribe(
      data => {
        console.log(data)
        alert('Add Room Service succesfully');
        this.serviceForm.reset();
      },
      err => {
        console.log(err);
      });
  }

  resetForm() {
    this.serviceForm.reset();
    this.previewLoaded = false;
  }



}
