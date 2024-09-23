import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-chat-files',
  templateUrl: './chat-files.component.html',
  styleUrl: './chat-files.component.scss'
})
export class ChatFilesComponent implements OnInit {

  data = [
    {
      month: "June",
      files: [
        {
          name: "This is my long long long long long long long long long long long name.pdf",
          size: "4.4 MB",
          date:  "Jun 20 at 14:45",
          img: ""
        },
        {
          name: "My text book.txt",
          size: "1.4 MB",
          date:  "Jun 19 at 13:45",
          img: "/svg/32x32.svg"
        }
      ]
    },
    {
      month: "May",
      files: [
        {
          name: "This is my name.longExtensionName",
          size: "4.4 MB",
          date:  "May 20 at 14:45",
          img: "/54x54.jpg"
        },
        {
          name: "My text book.txt",
          size: "1.4 MB",
          date:  "May 19 at 13:45",
          img: "/svg/64x16.svg"
        }
      ]
    }
  ]
  isLoading = true;

  ngOnInit(): void {
    setTimeout(()=> {
      this.isLoading = false;
    },1000);
  }

}
