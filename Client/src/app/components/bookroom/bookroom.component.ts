import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormArray, Validators } from '@angular/forms'
import { LocalStorageService } from "angular-web-storage";
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
@Component({
  selector: 'app-bookroom',
  templateUrl: './bookroom.component.html',
  styleUrls: ['./bookroom.component.css']
})
export class BookroomComponent implements OnInit {

  token: any;

  profileForm = new FormGroup({

    guest: new FormControl('', [Validators.required]),
    room: new FormControl(''),
    type: new FormControl('', [Validators.required]),
    datein: new FormControl(''),
    dateout: new FormControl(''),

  });

  get room() {
    return this.profileForm.get('room');
  }
  get guest() {
    return this.profileForm.get('guest');
  }

  constructor(private router: Router,
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

}
