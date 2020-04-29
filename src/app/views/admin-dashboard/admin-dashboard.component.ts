import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { EventService } from 'src/app/services/event.service';
import { UserService } from 'src/app/services/user.service';
import { CommonUtils } from 'src/app/utils/common-utils';
import { NotifierService } from "angular-notifier";

import { DatePipe } from '@angular/common';

declare let $: any;

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

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

  createdEvent = true;

  check1 = false;
  check2 = false;
  clickedDate;
  desc;
  user;
  eventID;
  eventTitle;
  startTime;
  endTime;
  table;

  // For editing event
  currentEvent;
  initialTitle = '';
  initialStart;
  initialEnd;
  initialDateAsString = '';
  initialPM1 = false;
  initialPM2 = false;
  initialMin;
  initialMax;
  initialResources = '';
  initialDescription = '';

  // For notifications
  private readonly notifier: NotifierService;

  editEventForm: FormGroup = new FormGroup({
    editEventTitle: new FormControl(null, Validators.required),
    editDate: new FormControl(null, Validators.required),
    editStartTime: new FormControl(null, Validators.required),
    editEndTime: new FormControl(null, Validators.required),
    editResources: new FormControl(null, Validators.required),
    editDescription: new FormControl(null),
    editMaxPlayers: new FormControl(null, Validators.required),
    editMinPlayers: new FormControl(null, Validators.required),
    // table:new FormControl(null),
    eventCreator: new FormControl(null),
    eventId: new FormControl(null),
  });

  constructor(
    private _eventsService: EventService,
    private _userService: UserService,
    private datePipe: DatePipe,
    private _commonUtils: CommonUtils,
    private notifierService: NotifierService
  ) { this.notifier = notifierService; }

  ngOnInit(): void {
    $('.menu .item').tab();

    this._eventsService.event().subscribe(
      (data) => {
        this.addEventsFromDB(data);
      },
      (error) => console.error(error)
    );

  }

  // remove event
  removeEvent(eventId) {
      this._eventsService.removeEvent(eventId).subscribe(
        (data) => {
          console.log(data);
          this.notifier.notify("success", "Removed event!");
        },
        (error) => console.error(error)
      );
      setTimeout(() => {
        window.location.reload();
      }, 1000);
      // this.notifier.notify("error", 'Event not removed.');
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

      if (event.startTime > 12) {
        event.startTime = this.formatTime(event.startTime);
      } else {
        event.startTime = `${event.startTime}am`;
      }
      if (event.endTime > 12) {
        event.endTime = this.formatTime(event.endTime);
      } else {
        event.endTime = `${event.endTime}am`;
      }

      this.events = this.events.concat({
        title: event.eventTitle,
        date: this.datePipe.transform(event.date, "M/d/yy"),
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

  updateEvent() {
    if (this.check1 === true) {
      this.editEventForm.value.editStartTime += 12;
    }
    if (this.check2 === true) {
      this.editEventForm.value.editEndTime += 12;
    }
    this.editEventForm.value.eventCreator = this.user;
    this._eventsService
      .editEvent(JSON.stringify(this.editEventForm.value))
      .subscribe(
        (data) => {
          this.putEditEventOnCalendar();
        },
        (error) => {
          this.notifier.notify("error", "Unable to update event");
          console.error(error)
        }
      );
      this.editEventForm.reset();
      this.notifier.notify("success", "Updated event!");
      setTimeout(() => {
        window.location.reload();
      }, 1000);
  }

  putEditEventOnCalendar() {
    let startTime = this.editEventForm.value.editStartTime;
    let endTime = this.editEventForm.value.editEndTime;
    const date = new Date(this.editEventForm.value.editDate);
    const dateCST = new Date(date.getTime() + Math.abs(date.getTimezoneOffset()*60000));

    if (this.check1 === false) {
      startTime += 12;
    }
    if (this.check2 === false) {
      endTime += 12;
    }

    const startDate = new Date(dateCST.getFullYear(), dateCST.getMonth(), dateCST.getDate(), startTime, 0);
    const endDate = new Date(dateCST.getFullYear(), dateCST.getMonth(), dateCST.getDate(), endTime, 0);

    console.log('start: ' + startDate)
    console.log('end: ' + endDate)

    //TODO REMOVE DUPLICATE EVENT ON UPDATE BEFORE CONCAT

    this.calendarEvents = this.calendarEvents.concat({
      title: this.editEventForm.value.editEventTitle,
      start: startDate,
      end: endDate,
    });
  }

  handleChecked(id) {
    this[`check${id.toString()}`] = this[`check${id.toString()}`] === false ? true : false;
  }

  displayEditEvent(arg) {
    this.currentEvent = arg;
    const initialTitle = this.currentEvent.title;

    // Date variables
    const date = new Date(this.currentEvent.start);

    // Time variables
    let start;
    const timeStart = new Date(this.currentEvent.start);
    let end;
    const timeEnd = new Date(this.currentEvent.end);

    // Min and max players
    const min = this.currentEvent.min;
    const max = this.currentEvent.max;

    // // Resources and description
    const resources = this.currentEvent.resources;
    const description = this.currentEvent.description;

    // Put start and end times in correct format
    if (timeStart.getHours() > 12) {
      start = timeStart.getHours() - 12;
      this.initialPM1 = true;
      this.check1 = true;
    } else {
      start = timeStart.getHours();
    }
    if (timeEnd.getHours() > 12) {
      end = timeEnd.getHours() - 12;
      this.initialPM2 = true;
      this.check2 = true;
    } else {
      end = timeEnd.getHours();
    }

    // Set form values
    this._commonUtils.setFormFieldValue(
      this.editEventForm,
      'editEventTitle',
      initialTitle
    );
    this._commonUtils.setFormFieldValue(
      this.editEventForm,
      'editDate',
      date
    );
    this._commonUtils.setFormFieldValue(
      this.editEventForm,
      'editStartTime',
      start
    );
    this._commonUtils.setFormFieldValue(this.editEventForm, 'editEndTime', end);
    this._commonUtils.setFormFieldValue(this.editEventForm, 'editResources', resources);
    this._commonUtils.setFormFieldValue(this.editEventForm, 'editDescription', description);
    this._commonUtils.setFormFieldValue(this.editEventForm, 'editMaxPlayers', max);
    this._commonUtils.setFormFieldValue( this.editEventForm, 'editMinPlayers', min);
    this._commonUtils.setFormFieldValue( this.editEventForm, 'eventId', this.currentEvent.id);

    $('#editEventModal').modal('show');
  }
  // handleEventClick(arg) {
  //   this.currentEvent = arg.event;
  //   this.createdEvent = false;
  //   // check if current user is user that created event
  //   const eventCreator = arg.event._def.extendedProps.creator;
  //   if (this.user === eventCreator) {
  //     this.createdEvent = true;
  //   }

  //   this.eventTitle = arg.event._def.title;
  //   const date = new Date(arg.event.start);
  //   let dateAsString = '';
  //   dateAsString += date.getFullYear() + '-';
  //   const month = date.getMonth() + 1;
  //   const day = date.getDate();
  //   if (month < 10) {
  //     dateAsString += '0' + month + '-';
  //   } else {
  //     dateAsString += month + '-';
  //   }
  //   if (day < 10) {
  //     dateAsString += '0' + day;
  //   } else {
  //     dateAsString += day;
  //   }

  //   this.events.forEach((theEvent) => {
  //     let eventDate = theEvent.date;
  //     if (eventDate != null) {
  //       eventDate = eventDate.slice(0, 10);
  //     }

  //     if (theEvent.title === this.eventTitle && eventDate === dateAsString) {
  //       event = theEvent;
  //       this.eventTitle = this.eventTitle;

  //       if (theEvent.startTime > 12) {
  //         this.startTime = this.formatTime(theEvent.startTime);
  //       } else {
  //         this.startTime = `${theEvent.startTime}:00 am`;
  //       }
  //       if (theEvent.endTime > 12) {
  //         this.endTime = this.formatTime(theEvent.endTime);
  //       } else {
  //         this.endTime = `${theEvent.endTime}:00 am`;
  //       }

  //       this.table = theEvent.table;
  //       this.eventID = theEvent.id;
  //       this.currentPlayers = theEvent.currentPlayers;
  //       this.desc = theEvent.description;
  //     }
  //   });

  //   $('#singleEventModal').modal('show');
  //   this.clickedDate = dateAsString;
  // }

  formatTime(time) {
    const newTime = time - 12;
    return `${newTime}pm`;
  }
}
