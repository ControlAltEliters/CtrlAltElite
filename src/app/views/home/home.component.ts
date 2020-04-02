import { Component, OnInit } from '@angular/core';
import { EventService } from '../../services/event.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public today = new Date();
  public tomorrow1 = new Date();
  public tomorrow2 = new Date();
  public tomorrow3 = new Date();
  public day1: string;
  public day2: string;
  public day3: string;
  public day4: string;
  events = [];
  array1 = [];
  array2 = [];
  array3 = [];
  array4 = [];



  constructor(
    private _eventService:EventService,
    private _router:Router
  ) {}

  ngOnInit(): void {
    this.today = new Date();
    this.today.setHours(-5,0,0,0);
    console.log(JSON.stringify(this.today));
    this.today.setTime(this.today.getTime() + 1 * 86400000);
    this.tomorrow1.setTime(this.today.getTime() + 1 * 86400000);
    this.tomorrow2.setTime(this.today.getTime() + 2 * 86400000);
    this.tomorrow3.setTime(this.today.getTime() + 3 * 86400000);

    this.day1 = this.transform(this.today.getDay());
    this.day2 = this.transform(this.tomorrow1.getDay());
    this.day3 = this.transform(this.tomorrow2.getDay());
    this.day4 = this.transform(this.tomorrow3.getDay());


    this._eventService.eventPuller()
    .subscribe(
      data => {
        // console.log('Events: ' + data);
        this.addEventsFromDB(data);
      },
      error => {
        console.log('Nothing is being returned yet');
      }
    )

    console.log(this.array1);
  }


  transform(num){
    if(num == 0){
      return 'SUN'
    }
    if(num == 1){
      return 'MON'
    }
    if(num == 2){
      return 'TUES';
    }
    if(num == 3){
      return 'WED'
    }
    if(num == 4){
      return 'THURS'
    }
    if(num == 5){
      return 'FRI'
    }
    if(num == 6){
      return 'SAT'
    }
  }


  addEventsFromDB(data){
    console.log('All events:')
    console.log(data)

    data.forEach(event => {

      // let eventDate = this.convertDateToCST(new Date(event.date));
      // let now = this.convertDateToCST(new Date());

      let eventDate = new Date(event.date);
      let now = new Date();

      console.log('evt: ' + event.eventTitle + eventDate.getDate())
      console.log('now: ' + now.getDate())

      if(eventDate.getDate() === now.getDate()){
        this.array1.push(event);


      }
      // if(JSON.stringify(event.date) === JSON.stringify(this.tomorrow1)){
      //   this.array2.push(event);
      // }
      // if(JSON.stringify(event.date) === JSON.stringify(this.tomorrow2)){
      //   this.array3.push(event);
      // }
      // if(JSON.stringify(event.date) === JSON.stringify(this.tomorrow3)){
      //   this.array4.push(event);
      // }

      // else{
      //   this.events.push(event);
      // }
    });
  }

  // convertDateToCST(date) {
  //   return date.toLocaleString("en-US", {timeZone: "America/Chicago"})
  // }

}

