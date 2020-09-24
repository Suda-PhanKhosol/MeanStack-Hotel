import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class RegisterService {
  register: any;

  constructor(private http: HttpClient) {}

  Register(register) {
    return this.http
      .post<any>("http://Localhost:3000/user/signup", register)
      .pipe(
        map((data) => {
          return data;
        })
      );
  }
}
