import { Component, OnInit, ElementRef } from '@angular/core';
import { EventService } from 'src/app/services/event.service';
import { UserService } from 'src/app/services/user.service';
import { compensateScroll } from '@fullcalendar/core';

@Component({
  selector: 'app-user-events',
  templateUrl: './user-events.component.html',
  styleUrls: ['./user-events.component.css']
})
export class UserEventsComponent implements OnInit {

  user
  userEvents = []

  constructor(
    private _eventsService:EventService,
    private elementRef: ElementRef,
    private _userService: UserService,
  ) { }

  ngOnInit(): void {
    this.user = sessionStorage.getItem('activeUser')
    console.log("USER!")
    console.log(this.user)
    this._eventsService.event().subscribe(
      data=> {this.findEventsForUser(data);},
      error=>console.error(error)
    )
  }

  findEventsForUser(data){
    data.forEach(event => {
      event.currentPlayers.forEach( currentplayer => {
        if(currentplayer == this.user){
          if(event.startTime > 12){
            event.startTime -= 12
          }
          if(event.endTime > 12){
            event.endTime -= 12
          }
          event.date = event.date.slice(0, 10)
          this.userEvents.push(event)
        }
      })
    })
    console.log(this.userEvents)
  }

}
