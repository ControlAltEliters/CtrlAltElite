import { Component, OnInit, HostListener } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SubscribeService } from '../../../services/subscribe.service';
// import { ConsoleReporter } from 'jasmine';
import { Router, Event, NavigationStart, NavigationEnd, NavigationError } from '@angular/router';

@Component({
  selector: 'app-contact-footer',
  templateUrl: './contact-footer.component.html',
  styleUrls: ['./contact-footer.component.css']
})

export class ContactFooterComponent implements OnInit {
  subscribeData: any = <any>{};

  showMap = false;

  constructor(private subscribeService: SubscribeService, private _router: Router) {

    this._router.events.subscribe((event: Event) => {
      if (this._router.url === "/home" || this._router.url === "/events" || this._router.url === "/faq" || this._router.url === "/") { this.showMap = true; }
      else { this.showMap = false; }
    });
  }

  ngOnInit(): void {
    this.showMap = true;
  }

  subscribe(subscribeForm: NgForm) {
    if (subscribeForm.invalid) {
      return;
    }
    // work on notifying if successfuly subscribed, clearing after success, moving subscribe button up, add margins
    this.subscribeService.subscribeToList(this.subscribeData)
      .subscribe(res => {
        alert('Subscribed!');
        console.log('Success');
      }, err => {
        console.log(err);
      })
  }

}
