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

  href: string = "";

  constructor(
    private _userService:UserService,
    private _router:Router,
  ) {
    this._userService.user()
      .subscribe(
        data=>this.setUser(data),
        // error=>this._router.navigate(['/login'])
      )
    }

  ngOnInit() {
    this.href = this._router.url;
  }

  setUser(data){
    console.log(data);
    this.setField('userFirst', data.firstname);
    this.setField('userLast', data.lastname);
    this.setField('activeUser', data.username);
    this.setField('userEmail', data.email);
  }

  setField(key, value){
    try {
      if (value) {
        sessionStorage.setItem(key, value);
      }
    }
    catch(err) {
      console.log('Error setting session storage field: ' + err)
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
