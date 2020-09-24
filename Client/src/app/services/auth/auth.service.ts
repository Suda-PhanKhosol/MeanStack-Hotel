import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { LocalStorageService } from "angular-web-storage";

@Injectable({
  providedIn: "root",
})
export class AuthService {

  status: any;
  constructor(private http: HttpClient, public local: LocalStorageService) { }
  getRoomService(token: any) {
    const headers = { 'Authorization': token }
    return this.http.get<any>("http://localhost:3000/roomservice/get", { headers })
      .pipe(map(data => {

        return data;
      }))
  }
  // signIn(authData: any) {
  //   return this.http
  //     .post<any>("http://localhost:3000/login/signin", authData)
  //     .pipe(
  //       map((data) => {
  //         if (data) {
  //           // para 1. key เวลาเราต้องการดึงขอ้มูลมาใช้งานเราตอ้งถึงผ่าน key
  //           // para 2. คือ ข้อมูลอะไรบ้างที่เราจะบันทึก
  //           // para 3. time ใส่เป็นตัวเลข
  //           // para 4. หน่วย w = สัปดาห์
  //           this.local.set("user", data, 1, "w");
  //           // test  ตอน deploy ต้องลบ
  //           console.log(this.local.get("user"));
  //         }
  //         // อยู่ใน fuction map ตั้ง return ค่า
  //         return data;
  //       })
  //     );
  // }
}

/**
 * imaport {Router} from '@angular/router';
 * constructor(private router:Router){}
 * this.router.navigate(['/products'])
 */
