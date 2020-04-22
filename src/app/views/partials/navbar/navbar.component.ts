import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { CommonUtils } from 'src/app/utils/common-utils';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  admin = false;
  user = false;
  inactive = true;
  href = '';

  constructor(
    private _userService: UserService,
    private _router: Router,
    private _commonutils: CommonUtils
  ) {
    this._userService.user().subscribe(
      (data) => this.setUser(data)
      // error=>this._router.navigate(['/login'])
    );
  }

  ngOnInit() {
    this.href = this._router.url;
  }

  setUser(data) {
    this._commonutils.setSessionField('userFirst', data.firstname);
    this._commonutils.setSessionField('userLast', data.lastname);
    this._commonutils.setSessionField('activeUser', data.username);
    this._commonutils.setSessionField('userEmail', data.email);
    this._commonutils.setSessionField('userId', data._id);

    if(this.readSession("activeUser")) {
      if(data.role == "Admin") {
        this.admin = true;
      }
      else {
        this.user = true;
      }
      this.inactive = false;
    }
  }

  readSession(key) {
    return sessionStorage.getItem(key);
  }

  logout() {
    this._userService.logout().subscribe(
      (data) => {
        sessionStorage.setItem('activeUser', '');
        this._router.navigate(['login']);
      },
      (error) => console.error(error)
    );
  }
}
