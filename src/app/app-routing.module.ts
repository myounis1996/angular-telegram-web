import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ChatWindowComponent} from "./chat-window/chat-window.component";
import {SidebarComponent} from "./sidebar/sidebar.component";

const routes: Routes = [
  {
    path: '',
    component: SidebarComponent
  },
  {
    path: ':username',
    component: ChatWindowComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
