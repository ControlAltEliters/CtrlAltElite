import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chat-box',
  templateUrl: './chat-box.component.html',
  styleUrls: ['./chat-box.component.css']
})
export class ChatBoxComponent implements OnInit {
  isCollapsed : boolean = true;
  isEmojiCollapsed : boolean = true;

  constructor() { }

  toggleChat()
  {
    this.isCollapsed = !this.isCollapsed;
  }

  toggleEmoji()
  {
    this.isEmojiCollapsed = !this.isEmojiCollapsed;
  }

  ngOnInit(): void {
  }

}
