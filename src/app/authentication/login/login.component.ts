import { Component, Input, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginError: String;
  @Input() on: boolean;

  loginForm: FormGroup = new FormGroup({
    email: new FormControl(null, Validators.required),
    password: new FormControl(null, Validators.required)
  });
  constructor(private _router: Router, private _userService: UserService) { }

  ngOnInit(): void {
    let i = 0;
    const welcome = 'Welcome Player 1';

    function typeWriter() {
      if (i < welcome.length) {
        document.getElementById('welcome').innerHTML += welcome.charAt(i);
        i++;
        setTimeout(typeWriter, 75);
      }
    }
    typeWriter();
  }

  login() {
    if (!this.loginForm.valid) {
      console.log('Invalid Form'); return;
    }

    this._userService.login(JSON.stringify(this.loginForm.value))
    .subscribe(
      data => {
        this._userService.user().subscribe(
          (data) => this.dealWithUser(data),
          (error) => {}
        ); 
      },
      error => {
        this.loginError = error.error.message;
      }
    );
  }

  dealWithUser(data){
    if(data.role === 'Admin'){
      this._router.navigate(['/adminDashboard'])
    } else {
      this._router.navigate(['/home']);
    }
    
  }

}
