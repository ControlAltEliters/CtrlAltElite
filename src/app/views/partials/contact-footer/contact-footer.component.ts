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
      this.toggleMessage("Requires valid email", false);
      return;
    }

    this.subscribeService.subscribeToList(this.subscribeData)
      .subscribe(res => {
        this.toggleMessage("Successfully subscribed!", true);
      }, err => {
          console.log(err);

          if (err.error.message === "JSONP injected script did not invoke callback.") { this.toggleMessage("Successfully subscribed!", true); }
          else { this.toggleMessage("Error occurred", false); }
      })
  }

  toggleMessage(msg:string, success:boolean){
    this.subscribeData.email = "";
    document.getElementById("email-box").setAttribute("placeholder", msg);

    if (success) { document.getElementById("email-box").setAttribute("style", "border-color:rgb(101, 197, 101) !important; border-width:.2em !important;"); }
    else { document.getElementById("email-box").setAttribute("style", "border-color:rgb(219, 125, 125) !important; border-width:.2em !important;"); }

    this.reset();
  }

  reset(){
    setTimeout(() => {
      document.getElementById("email-box").setAttribute("placeholder", "Email");
      document.getElementById("email-box").setAttribute("style", "border-color:none !important;");
    }, 3000);
  }

}
