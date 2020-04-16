import { Component, OnInit, HostListener } from '@angular/core';
// import { ConsoleReporter } from 'jasmine';
import { Router, Event, NavigationStart, NavigationEnd, NavigationError } from '@angular/router';

@Component({
  selector: 'app-contact-footer',
  templateUrl: './contact-footer.component.html',
  styleUrls: ['./contact-footer.component.css']
})
export class ContactFooterComponent implements OnInit {
  showMap = false;

  constructor(private _router: Router) {
    this._router.events.subscribe((event: Event) => {
      if (this._router.url === "/home" || this._router.url === "/events" || this._router.url === "/faq" || this._router.url === "/") { this.showMap = true; }
      else { this.showMap = false; }
    });
  }

  ngOnInit(): void {
    this.showMap = true;
  }

}
