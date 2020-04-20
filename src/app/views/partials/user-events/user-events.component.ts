import { Component, OnInit, ElementRef } from '@angular/core';
import { EventService } from 'src/app/services/event.service';
import { UserService } from 'src/app/services/user.service';
import { compensateScroll } from '@fullcalendar/core';

@Component({
  selector: 'app-user-events',
  templateUrl: './user-events.component.html',
  styleUrls: ['./user-events.component.css'],
})
export class UserEventsComponent implements OnInit {
  user;
  userEvents = [];
  today;

  constructor(
    private _eventsService: EventService,
    private elementRef: ElementRef,
    private _userService: UserService
  ) {}

  ngOnInit(): void {
    this.today = new Date();
    this.user = sessionStorage.getItem('activeUser');
    this._eventsService.event().subscribe(
      (data) => {
        this.findEventsForUser(data);
      },
      (error) => console.error(error)
    );
  }

  findEventsForUser(data) {
    data.forEach((event) => {
      event.currentPlayers.forEach((currentplayer) => {
        if (currentplayer == this.user) {
          if (event.startTime > 12) {
            event.startTime -= 12;
          }
          if (event.endTime > 12) {
            event.endTime -= 12;
          }
          event.date = event.date.slice(0, 10);
          this.userEvents.push(event);
        }
      });
    });
    console.log(this.userEvents);
  }
  eventIsInFuture(event): boolean {
    let answer = false;
    const date = new Date();
    let dateAsString = '';
    dateAsString += date.getFullYear() + '-';
    const month = date.getMonth() + 1;
    const day = date.getDate();
    if (month < 10) {
      dateAsString += '0' + month + '-';
    } else {
      dateAsString += month + '-';
    }
    if (day < 10) {
      dateAsString += '0' + day;
    } else {
      dateAsString += day;
    }
    if (event.date <= dateAsString) {
      console.log(event.date);
      console.log(dateAsString);
      answer = true;
    }
    return answer;
  }
}
