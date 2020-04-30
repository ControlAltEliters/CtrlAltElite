import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { NotifierService } from "angular-notifier";

var secret_admin_code = 'Arcadia';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {
  public ownerRegistration = false;

  private readonly notifier: NotifierService;

  @Input() on: boolean;

  registerForm: FormGroup = new FormGroup({
    firstname: new FormControl(null, Validators.required),
    lastname: new FormControl(null, Validators.required),
    email: new FormControl(null, [Validators.email, Validators.required]),
    username: new FormControl(null, Validators.required),
    password: new FormControl(null, Validators.required),
    cpass: new FormControl(null, Validators.required),
    profilePic: new FormControl(null),
    code: new FormControl(null)
  });

  constructor(private _router: Router, private _userService: UserService, private notifierService: NotifierService
  ) { this.notifier = notifierService; }


  ngOnInit() {}

  moveToLogin() {
    this._router.navigate(['/login']);
  }

  register() {
    if (!this.registerForm.valid || (this.registerForm.value.password != this.registerForm.value.cpass)) {
      this.notifier.notify("error", 'Invalid Form.');
      if(this.ownerRegistration && !this.registerForm.value.code) {
        this.notifier.notify("warning", 'Make sure you have correct admin code.');
      }
      this.notifier.notify("warning", 'Email or username may be non-unique, or entered passwords don\'t match.');
      this.registerForm.reset();
      return;
    }

    this.registerForm.value.profilePic = "";

    if(this.registerForm.value.code === secret_admin_code){
      this._userService.registerAdmin(JSON.stringify(this.registerForm.value))
      .subscribe(
        data => {
         this._router.navigate(['/login']);
          this.notifier.notify("success", "Successfully registered! Please login with new credentials.");
        },
        error => {
          this.notifier.notify("error", error.error.message);
          this.registerForm.reset();
        }
      );
    }else{
      this._userService.register(JSON.stringify(this.registerForm.value))
      .subscribe(
        data => {
          this._router.navigate(['/login']);
          this.notifier.notify("success", "Successfully registered! Please login with new credentials.");
        },
        error => {
          this.notifier.notify("error", error.error.message);
          this.registerForm.reset();
        }
      );
    }
    // console.log(JSON.stringify(this.registerForm.value));
  }

  toggleForm() {
    this.ownerRegistration = !this.ownerRegistration;
  }
}
