import { Component, OnInit } from '@angular/core';
import { CommonUtils } from 'src/app/utils/common-utils';
import { EventService } from '../../services/event.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NotifierService } from "angular-notifier";

@Component({
  selector: 'app-message-board',
  templateUrl: './message-board.component.html',
  styleUrls: ['./message-board.component.css']
})
export class MessageBoardComponent implements OnInit {

  user;
  currentEventID: string;
  currentEventTitle: String;
  currentEventStart;
  currentEventEnd;

  // Retrieving messages
  messages : string[] = [];

  // Notifications
  private readonly notifier: NotifierService;

  // Message form
  messageForm: FormGroup = new FormGroup({
    message: new FormControl(null, Validators.required),
    author: new FormControl(null),
    eventID: new FormControl(null),
  });

  constructor(
    private _commonUtils: CommonUtils,
    private _eventService: EventService,
    private notifierService: NotifierService
  ) {this.notifier = notifierService;}


  ngOnInit(): void {

    // Read from session to get event information
    this.user = this._commonUtils.readSessionField('activeUser');
    this.currentEventID = this._commonUtils.readSessionField('messagesID');
    this.currentEventTitle = this._commonUtils.readSessionField('messagesEventTitle');
    this.currentEventStart = this._commonUtils.readSessionField('messagesEventStart');
    this.currentEventEnd = this._commonUtils.readSessionField('messagesEventEnd');


    // Set form values for author and eventID
    this._commonUtils.setFormFieldValue(
      this.messageForm,
      'author',
      this.user
    );


    this._commonUtils.setFormFieldValue(
      this.messageForm,
      'eventID',
      this.currentEventID
    );

    // Find messages for current event
    this._eventService.findMessages(this.currentEventID).subscribe(
      (data: any) => {
        this.addMessagesFromDB(data.messagesList);
      },
      (error) => {
        console.log('Error retrieving messages');
      }
    );
  }

  readSession(key) {
    return sessionStorage.getItem(key);
  }

  addMessagesFromDB(data) {
    this.messages = [];
    data.forEach((message) => {
      message.timeSent = new Date(message.timeSent);
      console.log(message)
      this.messages.push(message);
    });
  }

  sendMessage() {

    // Check form
    if (!this.messageForm.valid) {
      console.log('Invalid Form');
      this.notifier.notify("error", 'Invalid form.');
      return;
    }

    this._eventService
      .addMessage(JSON.stringify(this.messageForm.value))
      .subscribe(
        (data) => {
          // Find messages for current event
          this._eventService.findMessages(this.currentEventID).subscribe(
            (data: any) => {
              this.addMessagesFromDB(data.messagesList);
            },
            (error) => {
              console.log('Error retrieving messages');
            }
          );
          this.notifier.notify("success", "Message posted!");
          this._commonUtils.setFormFieldValue(
            this.messageForm,
            'message',
            ''
          );
        },
        (error) => {
          this.notifier.notify("error", "Unable to create message :/");
          console.error(error)
        }
      );
  }
}
