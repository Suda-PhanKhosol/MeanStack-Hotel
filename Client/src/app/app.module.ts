
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { AngularWebStorageModule } from "angular-web-storage";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HomeComponent } from "./components/home/home.component";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { RegisterComponent } from "./components/register/register.component";
import { BookroomComponent } from "./components/bookroom/bookroom.component";
import { AddOnComponent } from "./components/add-on/add-on.component";
import { CommentComponent } from "./components/comment/comment.component";
import { DetailComponent } from "./components/detail/detail.component";
import { EmployeeComponent } from "./components/employee/employee.component";
import { RoomStatusComponent } from "./components/room-status/room-status.component";
import { ShowRoomStatusComponent } from "./components/show-room-status/show-room-status.component";
import { RoomServiceComponent } from "./components/room-service/room-service.component";
import { PromotionComponent } from "./components/promotion/promotion.component";
import { EmloginComponent } from './components/emlogin/emlogin.component';
import { ChildcommentComponent } from './components/child/childcomment/childcomment.component';
import { CommentsComponent } from './components/comments/comments.component';
import { CusloginComponent } from './components/cuslogin/cuslogin.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    RegisterComponent,
    BookroomComponent,
    AddOnComponent,
    CommentComponent,
    DetailComponent,
    EmployeeComponent,
    RoomStatusComponent,
    ShowRoomStatusComponent,
    RoomServiceComponent,
    PromotionComponent,
    EmloginComponent,
    ChildcommentComponent,
    CommentsComponent,
    CusloginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AngularWebStorageModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
