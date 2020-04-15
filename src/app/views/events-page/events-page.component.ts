import { Component, OnInit, ElementRef } from '@angular/core';
import {FormGroup,FormControl,Validators} from '@angular/forms';
import { EventService } from 'src/app/services/event.service';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGrigPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction'; // for dateClick
import { UserService } from 'src/app/services/user.service';
import { ThrowStmt } from '@angular/compiler';

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
  user
  userID
  eventID
  currentPlayers = []
  userJoin = { user:"", userID:"", event: "" };
  userQuit = { userID:"", event: "" };
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

  eventsForm:FormGroup = new FormGroup({
    eventTitle:new FormControl(null),
    date:new FormControl(null),
    startTime:new FormControl(null),
    endTime:new FormControl(null),
    resources: new FormControl(null),
    description: new FormControl(null),
    maxPlayers:new FormControl(null),
    minPlayers:new FormControl(null),
    table:new FormControl(null),
  })

  constructor(
    private _eventsService:EventService,
    private elementRef: ElementRef,
    private _userService: UserService ) { }

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
        title: event.eventTitle, start: startDate, end: endDate }
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
          table: event.table,
          id: event._id
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

    this._eventsService.join(this.userJoin).subscribe(
      data=> {console.log(data);},
      error=>console.error(error)
    )

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
    console.log(arg)
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
        console.log(this.currentPlayers)
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

    this._eventsService.createEvent(JSON.stringify(this.eventsForm.value))
    .subscribe(
      data=> {console.log(data);},
      error=>console.error(error)
    )

   this.putEventOnCalendar()
   this.eventsForm.reset();
   window.location.reload()
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
    // 2020-03-05
    // new Date(y, m, d, 12, 0)
  //  console.log(endTime)
  //  console.log((this.eventsForm.value.date))
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
