import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AddonService {

  constructor(private http: HttpClient) { }

  add(addon){
    return this.http.post<any>('http://localhost:3000/service/add', addon)
     .pipe(map(data => {
       return data;
     }));
  }
}
