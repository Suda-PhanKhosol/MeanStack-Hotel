import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormArray, Validators } from '@angular/forms'
import { asLiteral } from '@angular/compiler/src/render3/view/util';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  
  profileForm = new FormGroup({
    tel: new FormControl('',[Validators.required, Validators.pattern('[0-9]{10}')]),
    title: new FormControl('',[Validators.required]),
    name: new FormControl('',[Validators.required]),
    sur: new FormControl('',[Validators.required]),
    sex: new FormControl('',[Validators.required]),
    email: new FormControl('',[Validators.required, Validators.email]),
    address: new FormGroup({
      street: new FormControl('',[Validators.required]),
      city: new FormControl('',[Validators.required]),
      state: new FormControl('',[Validators.required]),
      zip: new FormControl('',[Validators.required]),
    }),
    aliases: new FormArray([
      new FormControl('')
    ])
  });
    get aliases() {
      return this.profileForm.get('aliases') as FormArray;
    }
   get email() {
     return this.profileForm.get('email');
   }
   get tel(){
     return this.profileForm.get('tel');
   }
   get name(){
    return this.profileForm.get('name');
  }
  get sur(){
    return this.profileForm.get('sur');
  }
  get title(){
    return this.profileForm.get('title');
  }
  get street(){
    return this.profileForm.get('address.street');
  }
  get city(){
    return this.profileForm.get('address.city');
  }
  get state(){
    return this.profileForm.get('address.state');
  }
  get zip(){
    return this.profileForm.get('address.zip');
  }

  constructor() { }

  ngOnInit(): void {
  }
  addAliases(){
    this.aliases.push(new FormControl(''));
  }

}
