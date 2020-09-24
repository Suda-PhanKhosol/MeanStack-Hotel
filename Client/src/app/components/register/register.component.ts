import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { RegisterService } from '../../services/register/register.service'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  RegisterForm = new FormGroup({
    Name: new FormControl('',[Validators.required]),
    Age: new FormControl('',[Validators.required]),
    Phone: new FormControl('',[Validators.required]),
    Email: new FormControl('',[Validators.required]),
    Password: new FormControl('',[Validators.required]),
    img: new FormControl('',[Validators.required])
  })

  previewLoaded: boolean = false;

  constructor(private rs: RegisterService) { }

  ngOnInit(): void {

  }
  get Name(){
    return this.RegisterForm.get('Name');
  }

  get Age(){
    return this.RegisterForm.get('Age');
  }

  get Phone(){
    return this.RegisterForm.get('Phone');
  }

  get Password(){
    return this.RegisterForm.get('Password');
  }

  get Email(){
    return this.RegisterForm.get('Email');
  }

  Register(){
    this.rs.Register(this.RegisterForm.value).subscribe(
      data => {
        console.log(data)
        alert('Register is successfully');
        this.RegisterForm.reset();
      },
      err => {
        console.log(err);
      });
  }

  onChangeImg(e:any){
    if(e.target.files.length > 0){
      const file = e.target.files[0];
      var pattern = /image-*/;
      const reader = new FileReader();
      if (!file.type.match(pattern)){
        alert('invalid format');
        this.RegisterForm.reset();
      }else{
        reader.readAsDataURL(file);
        reader.onload = () =>{
          this.previewLoaded = true;
          this.RegisterForm.patchValue({
            img: reader.result
          });
        };
      }
    }
  }

resetForm(){
  this.RegisterForm.reset();
}

}
