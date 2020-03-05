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
    eventTitle:new FormControl(null, Validators.required),
    date:new FormControl(null,[Validators.email,Validators.required]),
    startTime:new FormControl(null,Validators.required),
    endTime:new FormControl(null,Validators.required),
    maxPlayers:new FormControl(null,Validators.required),
    minPlayers:new FormControl(null,Validators.required)
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
      error=>console.error(error)
    )
  }

}
