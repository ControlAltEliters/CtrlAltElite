import { Component, OnInit, ElementRef } from '@angular/core';
import {FormGroup,FormControl,Validators} from '@angular/forms';
import { EventService } from 'src/app/services/event.service';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGrigPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction'; // for dateClick
import { UserService } from 'src/app/services/user.service';
import { CommonUtils } from 'src/app/utils/common-utils';
import { Router } from '@angular/router';
import { ThrowStmt } from '@angular/compiler';
import { environment } from 'src/environments/environment';

declare let $: any;

@Component({
  selector: 'app-events-page',
  templateUrl: './events-page.component.html',
  styleUrls: ['./events-page.component.css']
})
export class EventsPageComponent implements OnInit {
  calendarPlugins = [dayGridPlugin, timeGrigPlugin, interactionPlugin];
  public today = new Date();
  public testDate = '2020-03-22'
  public testTitle = 'Test Title'
  public dd = this.today.getDate();
  public mm = this.today.getMonth()+1; //January is 0!
  public yyyy = this.today.getFullYear();
  state = {}
  events = []
  check1 = false
  check2 = false
  clickedEvent
  clickedDate
  desc
  errorMessage:string;
  errorMessageModal = false
  successMessageModal = false
  user
  userID
  eventID
  currentPlayers = []
  inEvent = false;
  userJoin = { user:"", userID:"", event: "" };
  userQuit = { user:"", userID:"", event: "" };
  eventTitle
  startTime
  endTime
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
  table
  calendarEvents = [];
  tables = [];
  createdEvent = false

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

  eventsForm:FormGroup = new FormGroup({
    eventTitle:new FormControl(null, Validators.required),
    date:new FormControl(null, Validators.required),
    startTime:new FormControl(null, Validators.required),
    endTime:new FormControl(null, Validators.required),
    resources: new FormControl(null, Validators.required),
    description: new FormControl(null),
    maxPlayers:new FormControl(null, Validators.required),
    minPlayers:new FormControl(null, Validators.required),
    table:new FormControl(null),
    eventCreator:new FormControl(null),
  })

  editEventForm:FormGroup = new FormGroup({
    editEventTitle:new FormControl(null, Validators.required),
    editDate:new FormControl(null, Validators.required),
    editStartTime:new FormControl(null, Validators.required),
    editEndTime:new FormControl(null, Validators.required),
    editResources: new FormControl(null, Validators.required),
    editDescription: new FormControl(null),
    editMaxPlayers:new FormControl(null, Validators.required),
    editMinPlayers:new FormControl(null, Validators.required),
    // table:new FormControl(null),
    eventCreator:new FormControl(null),
    eventId: new FormControl(null)
  })

  constructor(
    private _eventsService:EventService,
    private elementRef: ElementRef,
    private _userService: UserService,
    private _commonUtils: CommonUtils,
    private _router: Router) { }

  ngOnInit(): void {
    this._eventsService.event().subscribe(
      data=> {this.addEventsFromDB(data);},
      error=>console.error(error)
    )

    this.user = sessionStorage.getItem('activeUser')

    this._userService.user()
    .subscribe(
      data => this.dealWithUser(data),
      error => {}
    )
  }

  seeIfTableIsAvailable(table, date, startTime, endTime): boolean{
    let available = true;

    this.events.forEach(event => {
      let eventStartTime = startTime;
      let eventEndTime = endTime;

      event.date = event.date ? event.date.slice(0, 10) : null;
      eventStartTime = this.check1 ? eventStartTime += 12 : eventStartTime;
      eventEndTime = this.check2 ? eventEndTime += 12 : eventEndTime;

      if(event.date == date &&
        event.table == table &&
        !(
          ((eventStartTime < event.startTime) && (eventEndTime <= event.startTime)) ||
          ((eventStartTime >= event.endTime) && (eventEndTime > event.endTime))
        )
        ) {
            available = false;
          }
        })
    return available;
  }

  dealWithUser(data){
    this.userID = data._id;
  }

  addEventsFromDB(data){

    data.forEach(event => {
      var date = new Date(event.date)
      var year = date.getFullYear()
      var month = date.getMonth()
      var day = date.getDate() + 1
      var startDate = new Date(year, month, day, event.startTime, 0)
      var endDate = new Date(year, month, day, event.endTime, 0)
      this.calendarEvents = this.calendarEvents.concat({
        title: event.eventTitle,
        start: startDate,
        end: endDate,
        creator: event.eventCreator,
        min: event.minPlayers,
        max: event.maxPlayers,
        resources: event.resources,
        description: event.description,
        id: event._id
      }
        );
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
          creator: event.eventCreator
        });
    });
  }

  renderTables(){

    if((this.seeIfTableIsAvailable("1", this.eventsForm.value.date, this.eventsForm.value.startTime, this.eventsForm.value.endTime)) == false){
      this.table1 = false
    } else {
      this.table1 = true
    }

    if((this.seeIfTableIsAvailable("2", this.eventsForm.value.date, this.eventsForm.value.startTime, this.eventsForm.value.endTime)) == false){
      this.table2 = false
    } else {
      this.table2 = true
    }

    if((this.seeIfTableIsAvailable("3", this.eventsForm.value.date, this.eventsForm.value.startTime, this.eventsForm.value.endTime)) == false){
      this.table3 = false
    } else {
      this.table3 = true
    }

    if((this.seeIfTableIsAvailable("4", this.eventsForm.value.date, this.eventsForm.value.startTime, this.eventsForm.value.endTime)) == false){
      this.table4 = false
    } else {
      this.table4 = true
    }

    if((this.seeIfTableIsAvailable("5", this.eventsForm.value.date, this.eventsForm.value.startTime, this.eventsForm.value.endTime)) == false){
      this.table5 = false
    } else {
      this.table5 = true
    }

  }

  clickedTable1(){
    console.log("Clicked Table 1!")
    if(this.table1 == false){
      this.table1checked == false
    } else if(this.table1checked == false){
      this.table1checked = true
    }else{
      this.table1checked = false
    }
  }

  clickedTable2(){
    console.log("Clicked Table 2!")
    if(this.table2 == false){
      this.table2checked = false;
    } else if(this.table2checked == false){
      this.table2checked = true
    }else{
      this.table2checked = false
    }
  }

  clickedTable3(){
    console.log("Clicked Table 3!")
    if(this.table3 == false){
      this.table3checked = false;
    }else if(this.table3checked == false){
      this.table3checked = true
    }else{
      this.table3checked = false
    }
  }

  clickedTable4(){
    console.log("Clicked Table 4!")
    if(this.table4 == false){
      this.table4checked = false;
    }else if(this.table4checked == false){
      this.table4checked = true
    }else{
      this.table4checked = false
    }
  }

  clickedTable5(){
    console.log("Clicked Table 5!")
    if(this.table5 == false){
      this.table5checked = false;
    }else if(this.table5checked == false){
      this.table5checked = true
    }else{
      this.table5checked = false
    }
  }

  joinEvent(eventID, user, userID){
    this.userJoin.event = eventID;
    this.userJoin.user = user;
    this.userJoin.userID = userID;

    if(this.alreadySignedUpForEvent(eventID, userID) == false){
      this._eventsService.join(this.userJoin).subscribe(
        data=> {console.log(data);},
        error=>console.error(error)
      )
      this.successMessageModal = true;
      setTimeout(()=>{ window.location.reload() }, 1000);
    }
    else{
      this.errorMessage = "User already registered.";
      this.errorMessageModal = true
      setTimeout(()=>{ this.errorMessageModal = false }, 3000)
    }
  }

  leaveEvent(eventID, user, userID){
    this.userQuit.event = eventID;
    this.userQuit.user = user;
    this.userQuit.userID = userID;

    if (this.alreadySignedUpForEvent(eventID, userID) == true) {
      this._eventsService.leave(this.userQuit).subscribe(
        data => { console.log(data); },
        error => console.error(error)
      )
      this.successMessageModal = true;
      setTimeout(() => { window.location.reload() }, 1000);
    }
    else {
      this.errorMessage = "User not registered.";
      this.errorMessageModal = true;
      setTimeout(() => { this.errorMessageModal = false }, 3000)
    }
  }

  undoErrorMessage(){
    this.errorMessageModal = false
  }

  alreadySignedUpForEvent(eventID, userID): boolean{
    var signedup = false
    this.events.forEach(event => {
      if(event.id == eventID){
        console.log("Found event")
        event.playersIDs.forEach(player =>{
          console.log(this.userID)
          if(player == this.userID){
            signedup = true
          }
        })
      }
    })
    return signedup
  }


  handleChecked1(){
    if(this.check1 === false){
      this.check1 = true;
    } else {
      this.check1 = false;
    }

    console.log(this.check1)
  }

  handleChecked2(){
    if(this.check2 === false){
      this.check2 = true;
    } else {
      this.check2 = false;
    }

    console.log(this.check2)
  }

  handleClick(event){
    console.log(event)
  }

  showCreateEventModal(){
    $('#createEventModal').modal('show');
  }

  handleEventClick(arg){
    this.currentEvent = arg.event;
    this.createdEvent = false;
    // check if current user is user that created event
    console.log(this.user);
    console.log(arg.event._def.extendedProps.creator);
    let eventCreator = arg.event._def.extendedProps.creator;
    if(this.user === eventCreator) {
      this.createdEvent = true;
    }
    console.log(this.createdEvent)

    this.eventTitle = arg.event._def.title
    var date = new Date(arg.event.start)
    var dateAsString = ''
    dateAsString += (date.getFullYear() + '-')
    var month = date.getMonth() + 1
    var day = date.getDate()
    if(month < 10){
      dateAsString += ( '0' + month + '-')
    } else {
      dateAsString += (month + '-')
    }
    if(day < 10){
      dateAsString += ('0' + day)
    } else {
      dateAsString += (day)
    }

    this.events.forEach(theEvent => {
      var eventDate = theEvent.date
      if(eventDate != null){
        eventDate = eventDate.slice(0, 10)
      }

      if(theEvent.title === this.eventTitle && eventDate === dateAsString){
        event = theEvent;
        this.eventTitle = this.eventTitle

        if(theEvent.startTime > 12){
          this.startTime = this.formatTime(theEvent.startTime);
        }
        else{
          this.startTime = `${theEvent.startTime}:00 am`
        }
        if(theEvent.endTime > 12){
          this.endTime = this.formatTime(theEvent.endTime);
        }
        else{
          this.endTime= `${theEvent.endTime}:00 am`
        }

        this.table = theEvent.table
        this.eventID = theEvent.id
        this.currentPlayers = theEvent.currentPlayers
        this.desc = theEvent.description
      }
    })

    $('#singleEventModal').modal('show');
    this.clickedDate = dateAsString
  }

  formatTime(time){
    let newTime = time - 12;
    return `${newTime}:00 pm`;
  }

  createEvent(){

    if(this.table1checked){
      this.eventsForm.value.table = "1";
    }else if(this.table2checked){
      this.eventsForm.value.table = "2";
    }else if(this.table3checked){
      this.eventsForm.value.table = "3";
    }else if(this.table4checked){
      this.eventsForm.value.table = "4";
    }else if(this.table5checked){
      this.eventsForm.value.table = "5";
    }

    if(!this.eventsForm.valid){
      console.log('Invalid Form'); return;
    }

    if(this.check1 === true){
      this.eventsForm.value.startTime += 12
    }
    if(this.check2 === true){
      this.eventsForm.value.endTime += 12
    }

    this.eventsForm.value.eventCreator = this.user;

    this._eventsService.createEvent(JSON.stringify(this.eventsForm.value))
    .subscribe(
      data=> {console.log(data);},
      error=>console.error(error)
    )

   this.putEventOnCalendar()
   this.eventsForm.reset();
   window.location.reload()
  }

  // Makes call to backend to change event information
  updateEvent() {

    console.log('--- event before start ---')
    console.log('check1: ' + this.check1)
    console.log('check2: ' + this.check2)
    console.log('start: ' + this.editEventForm.value.editStartTime)
    console.log('end: ' + this.editEventForm.value.editEndTime)
    console.log('--- event before end ---')

    if(this.check1 === true){
      this.editEventForm.value.editStartTime += 12
    }
    if(this.check2 === true){
      this.editEventForm.value.editEndTime += 12
    }

    console.log('--- event after start ---')
    console.log('check1: ' + this.check1)
    console.log('check2: ' + this.check2)
    console.log('start: ' + this.editEventForm.value.editStartTime)
    console.log('end: ' + this.editEventForm.value.editEndTime)
    console.log('--- event after end ---')

    this.editEventForm.value.eventCreator = this.user;

    this._eventsService.editEvent(JSON.stringify(this.editEventForm.value))
    .subscribe(
      data=> {
        console.log('It worked')
        console.log(data);
      },
      error=>console.error(error)
    )

    this.putEventOnCalendar()
    this.editEventForm.reset();
    window.location.reload()

  }

  // Show edit event modal and sets + prefills information from current event
  displayEditEvent() {
    let initialTitle = this.currentEvent.title;

    // Date variables
    let date = new Date(this.currentEvent.start)

    // Time variables
    let start;
    let timeStart = new Date(this.currentEvent.start);
    let end;
    let timeEnd = new Date(this.currentEvent.end);

    // Min and max players
    let min = this.currentEvent.extendedProps.min;
    let max = this.currentEvent.extendedProps.max;

    // // Resources and description
    let resources = this.currentEvent.extendedProps.resources;
    let description = this.currentEvent.extendedProps.description;

    // Put start and end times in correct format
    console.log('---ts: ' + timeStart.getHours())
    if(timeStart.getHours() > 12) {
      start = timeStart.getHours() - 12;
      this.initialPM1 = true;
      this.check1 = true;
    }
    else {
      start = timeStart.getHours();
    }

    console.log('---ts: ' + timeEnd.getHours())
    if(timeEnd.getHours() > 12) {
      end = timeEnd.getHours() - 12;
      this.initialPM2 = true;
      this.check2 = true;

    }
    else {
      end = timeEnd.getHours();
    }

    console.log('---')
    console.log('initialPM1: ' + this.initialPM1)
    console.log('initialPM2: ' + this.initialPM2)
    console.log('---')

    // Set form values
    this._commonUtils.setFormFieldValue(this.editEventForm, 'editEventTitle', initialTitle);
    this._commonUtils.setFormFieldValue(this.editEventForm, 'editDate', date.toISOString().slice(0,10));
    this._commonUtils.setFormFieldValue(this.editEventForm, 'editStartTime', start);
    this._commonUtils.setFormFieldValue(this.editEventForm, 'editEndTime', end);
    this._commonUtils.setFormFieldValue(this.editEventForm, 'editResources', resources);
    this._commonUtils.setFormFieldValue(this.editEventForm, 'editDescription', description);
    this._commonUtils.setFormFieldValue(this.editEventForm, 'editMaxPlayers', max);
    this._commonUtils.setFormFieldValue(this.editEventForm, 'editMinPlayers', min);
    this._commonUtils.setFormFieldValue(this.editEventForm, 'eventId', this.currentEvent.id);

    $('#editEventModal').modal('show');

  }

  putEventOnCalendar(){

    var startTime = this.eventsForm.value.startTime
    if(this.check1 === false){
      startTime += 12
    }
    var endTime = this.eventsForm.value.endTime
    if(this.check2 === false){
      endTime += 12
    }

    var date = this.eventsForm.value.date
    var testDate = new Date(date)
    var year = testDate.getFullYear()
    var month = testDate.getMonth()
    var day = testDate.getDate()
    var startDate = new Date(year, month, day, startTime, 0)
    var endDate = new Date(year, month, day, endTime, 0)

    this.calendarEvents = this.calendarEvents.concat({
      title: this.eventsForm.value.eventTitle, start: startDate, end: endDate });
  }

  chooseTable(){
    $('#createEventTableModal').modal('show');
    this.renderTables();
  }
}
