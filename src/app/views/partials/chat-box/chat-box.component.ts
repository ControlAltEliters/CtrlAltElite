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
    this.echoMessage();
    // clear the chat box 
    this.chatInputText = "";
    // TODO: Save this.chatInputText, the group id, and the time sent and save it to the database
  }
  echoMessage(){
    // append each message to the popup chat text
    var element1 = document.getElementById("chatMsg1");
    var element2 = document.getElementById("chatMsg2");
    var element3 = document.getElementById("chatMsg3");
    element3.innerHTML = element2.innerHTML;
    element2.innerHTML = element1.innerHTML;
    element1.innerHTML = this.chatInputText;
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
