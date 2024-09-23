import { Component } from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-forward-message-modal',
  templateUrl: './forward-message-modal.component.html',
  styleUrl: './forward-message-modal.component.scss'
})
export class ForwardMessageModalComponent {
  data = [
    {
      name: "Very long long long long long long long long long long long long Chat Name",
      img:"/54x54.jpg",
      status: "last seen recently"
    },
    {
      name: "This is a bot",
      img:"/54x54.jpg",
      status: "bot"
    },
    {
      name: "This is a bot",
      img:"/54x54.jpg",
      status: "bot"
    },{
      name: "This is a bot",
      img:"/54x54.jpg",
      status: "bot"
    },{
      name: "This is a bot",
      img:"/54x54.jpg",
      status: "bot"
    },{
      name: "This is a bot",
      img:"/54x54.jpg",
      status: "bot"
    },{
      name: "This is a bot",
      img:"/54x54.jpg",
      status: "bot"
    },{
      name: "This is a bot",
      img:"/54x54.jpg",
      status: "bot"
    },{
      name: "This is a bot",
      img:"/54x54.jpg",
      status: "bot"
    },{
      name: "This is a bot",
      img:"/54x54.jpg",
      status: "bot"
    },{
      name: "This is a bot",
      img:"/54x54.jpg",
      status: "bot"
    },{
      name: "This is a bot",
      img:"/54x54.jpg",
      status: "bot"
    },{
      name: "This is a bot",
      img:"/54x54.jpg",
      status: "bot"
    },
    {
      name: "Group Name",
      img:"",
      status: "600 Members"
    }
  ]

  scroll = 0;
  constructor(public modal: NgbActiveModal) {
  }

  onScroll(event: any) {
    this.scroll = event.target.scrollTop;
  }
}
