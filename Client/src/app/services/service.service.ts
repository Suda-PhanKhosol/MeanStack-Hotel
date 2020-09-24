import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private http: HttpClient) { }

  addService(service){
    return this.http.post<any>('http://localhost:3000/service/add', service)
     .pipe(map(data => {
       return data;
     }));
  }
}
