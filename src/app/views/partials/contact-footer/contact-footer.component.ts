import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SubscribeService } from '../../../services/subscribe.service';

@Component({
  selector: 'app-contact-footer',
  templateUrl: './contact-footer.component.html',
  styleUrls: ['./contact-footer.component.css']
})

export class ContactFooterComponent implements OnInit {
  subscribeData: any = <any>{};

  constructor(
    private subscribeService: SubscribeService
  ) { }

  ngOnInit(): void {
  }

  subscribe(subscribeForm: NgForm) {
    if (subscribeForm.invalid) {
      return;
    }
    this.subscribeService.subscribeToList(this.subscribeData)
      .subscribe(res => {
        alert('Subscribed!');
        console.log('Success');
      }, err => {
        console.log(err);
      })
  }

}
