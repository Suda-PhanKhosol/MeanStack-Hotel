
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./components/home/home.component";
import { AddOnComponent } from "./components/add-on/add-on.component";
import { BookroomComponent } from "./components/bookroom/bookroom.component";
import { CommentComponent } from "./components/comment/comment.component";
import { DetailComponent } from "./components/detail/detail.component";
import { EmployeeComponent } from "./components/employee/employee.component";
import { PromotionComponent } from "./components/promotion/promotion.component";
import { RegisterComponent } from "./components/register/register.component";
import { RoomServiceComponent } from "./components/room-service/room-service.component";
import { RoomStatusComponent } from "./components/room-status/room-status.component";
import { ShowRoomStatusComponent } from "./components/show-room-status/show-room-status.component";
import { EmloginComponent } from "./components/emlogin/emlogin.component";
import { ChildcommentComponent } from "./components/child/childcomment/childcomment.component";
import { CommentsComponent } from "./components/comments/comments.component";
import { CusloginComponent } from "./components/cuslogin/cuslogin.component";

const routes: Routes = [
  { path: "home", component: HomeComponent },
  { path: "addon", component: AddOnComponent },
  { path: "bookroom", component: BookroomComponent },
  { path: "comment", component: CommentComponent },
  { path: "detail", component: DetailComponent },
  { path: "employee", component: EmployeeComponent },
  { path: "promotion", component: PromotionComponent },
  { path: "redister", component: RegisterComponent },
  { path: "roomservice", component: RoomServiceComponent },
  { path: "roomstatus", component: RoomStatusComponent },
  { path: "showroom", component: ShowRoomStatusComponent },
  { path: "emlogin", component: EmloginComponent },
  { path: "childcomment", component: ChildcommentComponent },
  { path: "comments", component: CommentsComponent },
  { path: "cuslogin", component: CusloginComponent},
  { path: "", redirectTo: "home", pathMatch: "full" },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
