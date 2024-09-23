import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-chat-groups',
  templateUrl: './chat-groups.component.html',
  styleUrl: './chat-groups.component.scss'
})
export class ChatGroupsComponent implements OnInit {

  data = [
    {
      name: "Very long long long long long long long long long long long long Group Name",
      img:"/54x54.jpg",
      members: 5
    },
    {
      name: "Group Name",
      img:"",
      members: 600
    }
  ]

  isLoading = true;

  ngOnInit(): void {
    setTimeout(()=> {
      this.isLoading = false;
    },500);
  }
}
