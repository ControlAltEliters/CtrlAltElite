import { Component, OnInit, ElementRef } from '@angular/core';
import {FormGroup,FormControl,Validators} from '@angular/forms';
import { EventService } from 'src/app/services/event.service';
import dayGridPlugin from '@fullcalendar/daygrid';

declare var $: any;
@Component({
  selector: 'app-events-page',
  templateUrl: './events-page.component.html',
  styleUrls: ['./events-page.component.css']
})
export class EventsPageComponent implements OnInit {
  
  calendarPlugins = [dayGridPlugin];
  public showModal = false;
  public tableModal = false;
  public today = new Date();
  public dd = this.today.getDate();
  public mm = this.today.getMonth()+1; //January is 0!
  public yyyy = this.today.getFullYear();


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

  displayModal(){
    this.showModal = true;
  }

  hideModal(){
    this.showModal = false;
  }

  hideTableModal(){
    this.tableModal = false;
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
