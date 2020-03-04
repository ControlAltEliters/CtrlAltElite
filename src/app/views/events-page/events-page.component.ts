import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-events-page',
  templateUrl: './events-page.component.html',
  styleUrls: ['./events-page.component.css']
})
export class EventsPageComponent implements OnInit {

  public showModal = false;
  constructor() { }

  ngOnInit(): void {
  }

  displayModal(){
    this.showModal = true;
  }

  hideModal(){
    this.showModal = false;
  }

}
