import { Component, OnInit } from '@angular/core';
import {FormGroup,FormControl,Validators} from '@angular/forms';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-events-page',
  templateUrl: './events-page.component.html',
  styleUrls: ['./events-page.component.css']
})
export class EventsPageComponent implements OnInit {

  public showModal = false;

  eventsForm:FormGroup = new FormGroup({
    eventTitle:new FormControl(null),
    date:new FormControl(null),
    startTime:new FormControl(null),
    endTime:new FormControl(null),
    maxPlayers:new FormControl(null),
    minPlayers:new FormControl(null)
  })
  
  constructor(private _eventsService:EventService) { }

  ngOnInit(): void {
  }

  displayModal(){
    this.showModal = true;
  }

  hideModal(){
    this.showModal = false;
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
  }

}
