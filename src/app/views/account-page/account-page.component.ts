import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account-page',
  templateUrl: './account-page.component.html',
  styleUrls: ['./account-page.component.css']
})
export class AccountPageComponent implements OnInit {

  constructor(
    private _router:Router
  ) { }

  ngOnInit(): void {
  }

  readSession(key) {
    return sessionStorage.getItem(key);
  }

}
