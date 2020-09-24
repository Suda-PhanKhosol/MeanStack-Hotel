import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { SinginService } from '../../services/singin/singin.service'

@Component({
  selector: 'app-emlogin',
  templateUrl: './emlogin.component.html',
  styleUrls: ['./emlogin.component.css']
})
export class EmloginComponent implements OnInit {

  authForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(private router:Router, private login: SinginService) { }

  ngOnInit(): void {
  }
  signin(){
    console.log(this.authForm.value);
    this.login.signInAsAdmin(this.authForm.value).subscribe(
      data => {
        if(data.status == true){
          this.router.navigate(['/products']);
        }else{
          alert('Email or Password is incorrect!');
        }
      },
      err => {
        console.log(err);
        alert('Email or Password is incorrect!');
      });
  }
}
