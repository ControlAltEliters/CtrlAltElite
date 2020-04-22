import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';

var secret_admin_code = 'Arcadia';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {
  public ownerRegistration = false;

    
  registerError: String;
  @Input() on: boolean;

  registerForm: FormGroup = new FormGroup({
    firstname: new FormControl(null, Validators.required),
    lastname: new FormControl(null, Validators.required),
    email: new FormControl(null, [Validators.email, Validators.required]),
    username: new FormControl(null, Validators.required),
    password: new FormControl(null, Validators.required),
    code: new FormControl(null, Validators.required),
    cpass: new FormControl(null, Validators.required)
  });
  constructor(private _router: Router, private _userService: UserService) { }
  

  ngOnInit() {}

  moveToLogin() {
    this._router.navigate(['/login']);
  }

  

  register() {
    // need to add ability to set up owner account since now have input for admin code
    if (!this.registerForm.valid || (this.registerForm.controls.password.value != this.registerForm.controls.cpass.value)) {
      this.registerError = 'Invalid Form';
      console.log('Invalid Form');
      return;
    }

    if(this.registerForm.value.code === secret_admin_code){
      this._userService.registerAdmin(JSON.stringify(this.registerForm.value))
      .subscribe(
        data => {
         this._router.navigate(['/login']);
        },
        error => {
          this.registerError = error.error.message;
        }
      );
    }else{
      this._userService.register(JSON.stringify(this.registerForm.value))
      .subscribe(
        data => {
          this._router.navigate(['/login']);
        },
        error => {
          this.registerError = error.error.message;
        }
      );
    }


    // console.log(JSON.stringify(this.registerForm.value));
  }
  
  toggleForm() {
    this.ownerRegistration = !this.ownerRegistration;
  }
}
