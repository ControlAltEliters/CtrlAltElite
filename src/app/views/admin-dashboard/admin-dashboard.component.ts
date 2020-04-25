import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { EventService } from 'src/app/services/event.service';
import { UserService } from 'src/app/services/user.service';
import { Calendar } from '@fullcalendar/core';
import listPlugin from '@fullcalendar/list';

declare let $: any;

// let calendar = new Calendar(calendarEl, {
//   plugins: [ listPlugin ],
//   defaultView: 'listWeek'
// });

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  calendarPlugins = [listPlugin];
  public today = new Date();
  public testDate = '2020-03-22';
  public testTitle = 'Test Title';
  public dd = this.today.getDate();
  public mm = this.today.getMonth() + 1; // January is 0!
  public yyyy = this.today.getFullYear();

  events = [];
  tables = [];
  calendarEvents = [];
  currentPlayers = [];
  searchString: string;

  errorMessage: string;

  constructor(
    private _eventsService: EventService,
    private _userService: UserService,
  ) { }

  ngOnInit(): void {
    $('.menu .item').tab();

    this._eventsService.event().subscribe(
      (data) => {
        this.addEventsFromDB(data);
      },
      (error) => console.error(error)
    );

  }

  addEventsFromDB(data) {
    data.forEach((event) => {
      const date = new Date(event.date);
      const year = date.getFullYear();
      const month = date.getMonth();
      const day = date.getDate() + 1;
      const startDate = new Date(year, month, day, event.startTime, 0);
      const endDate = new Date(year, month, day, event.endTime, 0);
      this.calendarEvents = this.calendarEvents.concat({
        title: event.eventTitle,
        start: startDate,
        end: endDate,
        creator: event.eventCreator,
        min: event.minPlayers,
        max: event.maxPlayers,
        resources: event.resources,
        description: event.description,
        id: event._id,
      });
      this.events = this.events.concat({
        title: event.eventTitle,
        date: event.date,
        description: event.description,
        startTime: event.startTime,
        endTime: event.endTime,
        resources: event.resources,
        currentPlayers: event.currentPlayers,
        maxPlayers: event.maxPlayers,
        minPlayers: event.minPlayers,
        playersIDs: event.playersIDs,
        table: event.table,
        id: event._id,
        creator: event.eventCreator,
      });
    });
  }

  

}
