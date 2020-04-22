import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonUtils } from 'src/app/utils/common-utils';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Arcadia';

  constructor(private router: Router, private _commonutils: CommonUtils) { }

  ngOnInit() { }
}
