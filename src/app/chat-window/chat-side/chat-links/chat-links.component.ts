import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-chat-links',
  templateUrl: './chat-links.component.html',
  styleUrl: './chat-links.component.scss'
})
export class ChatLinksComponent implements OnInit {

  data = [
    {
      month: "Jun",
      links: [
        {
          title: "verylonghostname.verylonghostname.verylonghostname",
          message:  "The message contains a following link https://facebook.com",
          detectedLink: "https://facebook.com",
          img: ""
        }
      ]
    },
    {
      month: "May",
      links: [
        {
          title: "THE TITLE PREVIEW",
          message:  "The message contains a following link https://signin.aws.amazon.com/signin?redirect_uri=",
          detectedLink: "https://signin.aws.amazon.com/signin?redirect_uri=",
          img: "/svg/1920x1080.svg"
        },
        {
          title: "verylonghostname.verylonghostname.verylonghostname",
          message:  "The message contains a following linkhttps://signin.aws.amazon.com",
          detectedLink: "https://signin.aws.amazon.com",
          img: ""
        }
      ]
    }
  ]
  isLoading = true;

  ngOnInit(): void {
    setTimeout(()=> {
      this.isLoading = false;
    },500);
  }
}
