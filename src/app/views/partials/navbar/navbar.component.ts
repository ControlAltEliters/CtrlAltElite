import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { ApplicationRef } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(
    private _userService:UserService,
    private _router:Router,
  ) {
    this._userService.user()
      .subscribe(
        data => this.setUser(data),
        error => {}
      )
    }

  ngOnInit() {}

  setUser(data){
    if (data.username) {
      sessionStorage.setItem('activeUser', data.username);
    }
  }

  readSession(key) {
    return sessionStorage.getItem(key);
  }

  logout(){
    this._userService.logout()
    .subscribe(
      data=>{
        sessionStorage.setItem('activeUser', '');
        this._router.navigate(['login']);
      },
      error=>console.error(error)
    )
  }

}
