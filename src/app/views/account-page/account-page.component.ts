import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonUtils } from 'src/app/utils/common-utils';

@Component({
  selector: 'app-account-page',
  templateUrl: './account-page.component.html',
  styleUrls: ['./account-page.component.css'],
})
export class AccountPageComponent implements OnInit {
  activeUser: string;

  constructor(private _router: Router, private _commonUtils: CommonUtils) {}

  ngOnInit(): void {
    this.activeUser = this._commonUtils.readSessionField('activeUser');
  }
}
