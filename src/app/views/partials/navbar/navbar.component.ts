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
  profilePic: string;
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
      (data) => this.setUser(data),
      (error) => {
        this._commonutils.setSessionField('userType', "inactive");
      }
    );
  }

  ngOnInit() {
    this.href = this._router.url;
    localStorage.setItem("path", "home");
  }

  setUser(data) {
    this._commonutils.setSessionField('userFirst', data.firstname);
    this._commonutils.setSessionField('userLast', data.lastname);
    this._commonutils.setSessionField('activeUser', data.username);
    this._commonutils.setSessionField('userEmail', data.email);
    this._commonutils.setSessionField('userId', data._id);
    this._commonutils.setSessionField('role', data.role);

    switch (data.userImage) {
      case "1":
        this._commonutils.setSessionField("profilePic", "../../../../assets/images/bulbasaur.png");
        break;
      case "2":
        this._commonutils.setSessionField("profilePic", "../../../../assets/images/charmander.png");
        break;
      case "3":
        this._commonutils.setSessionField("profilePic", "../../../../assets/images/eevee.png");
        break;
      case "4":
        this._commonutils.setSessionField("profilePic", "../../../../assets/images/jigglypuff.png");
        break;
      case "5":
        this._commonutils.setSessionField("profilePic", "../../../../assets/images/meowth.png");
        break;
      case "6":
        this._commonutils.setSessionField("profilePic", "../../../../assets/images/pikachu.png");
        break;
      case "7":
        this._commonutils.setSessionField("profilePic", "../../../../assets/images/snorlax.png");
        break;
      default:
        this._commonutils.setSessionField("profilePic", "../../../../assets/images/default.png");
        break;
    }

    this.profilePic = this._commonutils.readSessionField("profilePic");

    if(this.readSession("activeUser")) {
      if(data.role == "Admin") {
        this._commonutils.setSessionField('userType', "admin");
        localStorage.setItem("path", "adminDashboard");
      }
      else {
        this._commonutils.setSessionField('userType', "user");
      }
    }
    else {
      this._commonutils.setSessionField('userType', "inactive");
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
