import { Component, OnInit, ElementRef } from '@angular/core';
import {FormGroup,FormControl,Validators} from '@angular/forms';
import { EventService } from 'src/app/services/event.service';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGrigPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction'; // for dateClick

declare var $: any;
@Component({
  selector: 'app-events-page',
  templateUrl: './events-page.component.html',
  styleUrls: ['./events-page.component.css']
})
export class EventsPageComponent implements OnInit {
  
  calendarPlugins = [dayGridPlugin, timeGrigPlugin, interactionPlugin];
  public showModal = false;
  public tableModal = false;
  public today = new Date();
  public dd = this.today.getDate();
  public mm = this.today.getMonth()+1; //January is 0!
  public yyyy = this.today.getFullYear();


  calendarEvents = [
    { title: 'event 1', date: '2020-03-20' }
  ];

  eventsForm:FormGroup = new FormGroup({
    eventTitle:new FormControl(null),
    date:new FormControl(null),
    startTime:new FormControl(null),
    endTime:new FormControl(null),
    maxPlayers:new FormControl(null),
    minPlayers:new FormControl(null),
    table:new FormControl(null),
  })
  
  constructor(private _eventsService:EventService, private elementRef: ElementRef) { }

  ngOnInit(): void {

  }
  
  handleClick(event){
    console.log(event)
  }

  displayModal(){
    this.showModal = true;
  }

  hideModal(){
    this.showModal = false;
  }

  hideTableModal(){
    this.tableModal = false;
  }

  handleEventClick(arg){
    console.log(arg)
  }

  createEvent(){
  
    if(!this.eventsForm.valid){
      console.log('Invalid Form'); return;
    }
    
    this._eventsService.createEvent(JSON.stringify(this.eventsForm.value))
    .subscribe(
      data=> {console.log(data);},
      error=>console.error(error)
    )

   this.tableModal = false;

  }

  chooseTable(){
    this.showModal = false;
    this.tableModal = true;
  }

}
