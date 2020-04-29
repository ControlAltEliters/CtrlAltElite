import { Component, OnInit, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { EventService } from 'src/app/services/event.service';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGrigPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction'; // for dateClick
import { UserService } from 'src/app/services/user.service';
import { CommonUtils } from 'src/app/utils/common-utils';
import { Router } from '@angular/router';
import { NotifierService } from "angular-notifier";
import { DatePipe } from '@angular/common';

declare let $: any;

@Component({
  selector: 'app-events-page',
  templateUrl: './events-page.component.html',
  styleUrls: ['./events-page.component.css'],
})

export class EventsPageComponent implements OnInit {
  calendarPlugins = [dayGridPlugin, timeGrigPlugin, interactionPlugin];
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
  userJoin = { user: '', userID: '', event: '' };
  userQuit = { user: '', userID: '', event: '' };

  errorMessage: string;

  check1 = false;
  check2 = false;
  errorMessageModal = false;
  inEvent = false;
  table1 = true;
  table2 = true;
  table3 = true;
  table4 = true;
  table5 = true;
  table1checked = false;
  table2checked = false;
  table3checked = false;
  table4checked = false;
  table5checked = false;
  createdEvent = false;

  clickedDate;
  desc;
  user;
  userID;
  eventID;
  eventTitle;
  startTime;
  endTime;
  table;
  maxPlayers;

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

  // Forms
  eventsForm: FormGroup = new FormGroup({
    eventTitle: new FormControl(null, Validators.required),
    date: new FormControl(null, Validators.required),
    startTime: new FormControl(null, Validators.required),
    endTime: new FormControl(null, Validators.required),
    resources: new FormControl(null, Validators.required),
    description: new FormControl(null),
    maxPlayers: new FormControl(null, Validators.required),
    minPlayers: new FormControl(null, Validators.required),
    table: new FormControl(null),
    eventCreator: new FormControl(null),
    eventCreatorID: new FormControl(null)
  });

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
    private elementRef: ElementRef,
    private _userService: UserService,
    private _commonUtils: CommonUtils,
    private _router: Router,
    private datePipe: DatePipe,
    private notifierService: NotifierService
  ) {this.notifier = notifierService;}

  ngOnInit(): void {
    this._eventsService.event().subscribe(
      (data) => {
        this.addEventsFromDB(data);
      },
      (error) => console.error(error)
    );
    this.user = sessionStorage.getItem('activeUser');
    this._userService.user().subscribe(
      (data) => this.dealWithUser(data),
      (error) => {}
    );
  }

  handleClick(event) {
    // this.notifier.notify("success", "You clicked a date!");
  }

  dealWithUser(data) {
    this.userID = data._id;
  }

  formatTime(time) {
    const newTime = time - 12;
    return `${newTime}:00 pm`;
  }

  chooseTable() {
    $('#createEventTableModal').modal('show');
    this.renderTables();
  }

  showCreateEventModal() {
    $('#createEventModal').modal('show');
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

  // display tables
  renderTables() {
    const tables = [1, 2, 3, 4, 5];
    tables.forEach((table) => {
      if (
        this.seeIfTableIsAvailable(
          table.toString(),
          this.eventsForm.value.date,
          this.eventsForm.value.startTime,
          this.eventsForm.value.endTime
        ) == false
      ) {
        this[`table${table}`] = false;
      } else {
        this[`table${table}`] = true;
      }
    });
  }


  seeIfTableIsAvailable(table, date, startTime, endTime): boolean {
    let available = true;

    this.events.forEach((event) => {
      let eventStartTime = startTime;
      let eventEndTime = endTime;

      event.date = event.date ? event.date.slice(0, 10) : null;
      eventStartTime = this.check1 ? (eventStartTime += 12) : eventStartTime;
      eventEndTime = this.check2 ? (eventEndTime += 12) : eventEndTime;

      if (
        event.date == date &&
        event.table == table &&
        !(
          (eventStartTime < event.startTime &&
            eventEndTime <= event.startTime) ||
          (eventStartTime >= event.endTime && eventEndTime > event.endTime)
        )
      ) {
        available = false;
      }
    });
    return available;
  }

  // handle table clicks
  clickedTable(tableNumber) {
    const tables = [1, 2, 3, 4, 5];
    const table = 'table'.concat(tableNumber);
    const tablechecked = `table${tableNumber.toString()}checked`;

    // check specific table
    this[tablechecked] = this[table] == false ? false : this[tablechecked];
    this[tablechecked] = (this[table] == true && this[tablechecked] == false) ? true : false;

    // uncheck all other tables
    tables.splice(tables.indexOf(tableNumber), 1);
    tables.forEach(t => this[`table${t.toString()}checked`] = false);
  }

  // join existing event
  joinEvent(eventID, user, userID) {
    this.userJoin.event = eventID;
    this.userJoin.user = user;
    this.userJoin.userID = userID;

      this.events.forEach((theEvent) => {
        if(theEvent.id == eventID)
        {
          if (this.currentEvent.extendedProps.max <= theEvent.currentPlayers.length)
          {
            console.log(theEvent.currentPlayers.length);
            this.notifier.notify("error", "Event full, could not join.");
            setTimeout(() => { $('#singleEventModal').modal('hide'); }, 1000);
            return;
          }
          else
          {
            if (this.alreadySignedUpForEvent(eventID, userID) == false) {
              this._eventsService.join(this.userJoin).subscribe(
                (data) => {
                  console.log(data);
                },
                (error) => console.error(error)
              );
              this.notifier.notify("success", "Joined event!");
              setTimeout(() => {
                window.location.reload();
              }, 1000);
            }
            else
            {
              this.notifier.notify("error", 'User already registered.');
            }
          }
        }
      })
  }

  // pop up message while routing not logged in user to login page
  notLoggedIn(){
    this.notifier.notify("warning", "You must be logged in to do that!");
  }

  // leave joined event
  leaveEvent(eventID, user, userID) {
    this.userQuit.event = eventID;
    this.userQuit.user = user;
    this.userQuit.userID = userID;

    if (this.alreadySignedUpForEvent(eventID, userID) == true) {
      this._eventsService.leave(this.userQuit).subscribe(
        (data) => {
          console.log(data);
        },
        (error) => console.error(error)
      );
      this.notifier.notify("success", "Left event!");
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } else {
      this.notifier.notify("error", 'User not registered.');
    }
  }

  alreadySignedUpForEvent(eventID, userID): boolean {
    let signedup = false;
    this.events.forEach((event) => {
      if (event.id == eventID) {
        console.log(event.playersIDs);
        console.log(event.currentPlayers);
        event.playersIDs.forEach((player) => {
          if (player == userID) {
            signedup = true;
          }
        });
      }
    });
    return signedup;
  }

  handleChecked(id) {
    this[`check${id.toString()}`] = this[`check${id.toString()}`] === false ? true : false;
  }

  handleEventClick(arg) {
    this.currentEvent = arg.event;
    this.createdEvent = false;
    // check if current user is user that created event
    const eventCreator = arg.event._def.extendedProps.creator;
    if (this.user === eventCreator) {
      this.createdEvent = true;
    }

    this.eventTitle = arg.event._def.title;
    const date = new Date(arg.event.start);
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

    this.events.forEach((theEvent) => {
      let eventDate = theEvent.date;
      if (eventDate != null) {
        eventDate = eventDate.slice(0, 10);
      }

      if (theEvent.title === this.eventTitle && eventDate === dateAsString) {
        event = theEvent;
        this.eventTitle = this.eventTitle;

        if (theEvent.startTime > 12) {
          this.startTime = this.formatTime(theEvent.startTime);
        } else {
          this.startTime = `${theEvent.startTime}:00 am`;
        }
        if (theEvent.endTime > 12) {
          this.endTime = this.formatTime(theEvent.endTime);
        } else {
          this.endTime = `${theEvent.endTime}:00 am`;
        }

        this.table = theEvent.table;
        this.eventID = theEvent.id;
        this.currentPlayers = theEvent.currentPlayers;
        this.maxPlayers = theEvent.maxPlayers;
        this.desc = theEvent.description;
      }
    });

    $('#singleEventModal').modal('show');
    // this.clickedDate = dateAsString
    this.clickedDate = this.datePipe.transform(dateAsString, 'MM/dd/yyyy');
  }

  createEvent() {
    if (this.table1checked) {
      this.eventsForm.value.table = '1';
    } else if (this.table2checked) {
      this.eventsForm.value.table = '2';
    } else if (this.table3checked) {
      this.eventsForm.value.table = '3';
    } else if (this.table4checked) {
      this.eventsForm.value.table = '4';
    } else if (this.table5checked) {
      this.eventsForm.value.table = '5';
    }

    if (!this.eventsForm.valid) {
      console.log('Invalid Form');
      return;
    }
    if (this.check1 === true) {
      this.eventsForm.value.startTime += 12;
    }
    if (this.check2 === true) {
      this.eventsForm.value.endTime += 12;
    }
    this.eventsForm.value.eventCreator = this.user;
    this.eventsForm.value.eventCreatorID = this.userID;

    this._eventsService
      .createEvent(JSON.stringify(this.eventsForm.value))
      .subscribe(
        (data) => {
          this.putEventOnCalendar();
        },
        (error) => {
          this.notifier.notify("error", "Unable to create event");
          console.error(error)
        }
      );
    this.eventsForm.reset();
    this.notifier.notify("success", "Event created!");
    setTimeout(() => {
      window.location.reload();
    }, 1000);

  }

  // Makes call to backend to change event information
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

  // Show edit event modal and sets + prefills information from current event
  displayEditEvent() {
    const initialTitle = this.currentEvent.title;

    // Date variables
    const date = new Date(this.currentEvent.start);

    // Time variables
    let start;
    const timeStart = new Date(this.currentEvent.start);
    // console.log("EDIT EVENT 1: " + timeStart);
    let end;
    const timeEnd = new Date(this.currentEvent.end);
    // console.log("EDIT EVENT 2: " + timeEnd);

    // Min and max players
    const min = this.currentEvent.extendedProps.min;
    const max = this.currentEvent.extendedProps.max;

    // // Resources and description
    const resources = this.currentEvent.extendedProps.resources;
    const description = this.currentEvent.extendedProps.description;

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
      date.toISOString().slice(0, 10)
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

  putEventOnCalendar() {
    let startTime = this.eventsForm.value.startTime;
    let endTime = this.eventsForm.value.endTime;
    const date = new Date(this.eventsForm.value.date);
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

    this.calendarEvents = this.calendarEvents.concat({
      title: this.eventsForm.value.eventTitle,
      start: startDate,
      end: endDate,
    });
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
}
