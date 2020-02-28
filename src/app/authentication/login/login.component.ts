import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  registerForm: FormGroup;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  moveToLogin() {
    this.router.navigateByUrl('/home');
  }

}
