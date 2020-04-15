import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-contact-footer',
  templateUrl: './contact-footer.component.html',
  styleUrls: ['./contact-footer.component.css']
})
export class ContactFooterComponent implements OnInit {

  lat = 33.072536;
  lng = -97.044921;
  constructor() { }

  ngOnInit(): void {
  }

}
