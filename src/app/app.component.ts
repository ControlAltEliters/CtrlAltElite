import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Arcadia';
  loginStatus = false;
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.authService.isLoggedIn.subscribe((status: any) => {
      console.log(status);
      if (status === true) {
        this.loginStatus = true;
      } else {
        this.loginStatus = false;
      }
    });
  }

  logout() {
    this.authService.logout()
      .subscribe((res: any) => {
        this.router.navigate(['/']);
      }, err => {
        console.log(err);
      });
  }

}
