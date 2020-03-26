import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-chat-box',
  templateUrl: './chat-box.component.html',
  styleUrls: ['./chat-box.component.css']
})
export class ChatBoxComponent implements OnInit {
  isCollapsed : boolean = true;
  isEmojiCollapsed : boolean = true;
  @Input() chatInputText : string;

  constructor() { }

  userMessageInput(event){
    console.log("event = " + event)
    event.chatInputText = "User text input goes here"
    console.log("this.chatInputText = " + this.chatInputText);
    this.echoMessage();
  }
  echoMessage(){
    console.log("echoMessage this.chatInputText = " + this.chatInputText);
  }

  toggleChat(){
    this.isCollapsed = !this.isCollapsed;
  }

  toggleEmoji(){
    this.isEmojiCollapsed = !this.isEmojiCollapsed;
  }

  ngOnInit(): void {
  }

}
