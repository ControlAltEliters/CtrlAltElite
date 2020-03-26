import { Component, Input, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { FormGroup,FormControl,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonUtils } from 'src/app/utils/common-utils';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  public showModal = false;
  userFirstName: string;
  userLastName: string;
  userName: string;
  userEmail: string;
  editProfileError: String;

  editProfile: FormGroup = new FormGroup({
    editFirstName:new FormControl(null),
    editLastName:new FormControl(null),
    editEmail:new FormControl(null),
    userId: new FormControl(null)
  })

  constructor(
    private _router:Router,
    private _userService:UserService,
    private _commonUtils: CommonUtils,
    // public ngNoty: NgNoty
  ) {}

  ngOnInit(): void {
    //set local state
    this.userFirstName = this._commonUtils.readSessionField('userFirst');
    this.userLastName = this._commonUtils.readSessionField('userLast');
    this.userName = this._commonUtils.readSessionField('activeUser');
    this.userEmail = this._commonUtils.readSessionField('userEmail');
    // prepare form
    this._commonUtils.setFormFieldValue(this.editProfile, 'editFirstName', this.userFirstName);
    this._commonUtils.setFormFieldValue(this.editProfile, 'editLastName', this.userLastName);
    this._commonUtils.setFormFieldValue(this.editProfile, 'editEmail', this.userEmail);
    this._commonUtils.setFormFieldValue(this.editProfile, 'userId', this._commonUtils.readSessionField('userId'));
  }

  displayModal(){
    this.showModal = true;
  }

  hideModal(){
    this.showModal = false;
  }

  editUserProfile(){
    if(!this.editProfile.valid){
      this.editProfileError = "Invalid Form";
      console.log('Invalid Form');
      return;
    }
    this._userService.editProfile(JSON.stringify(this.editProfile.value))
    .subscribe(
      data => {
        // set local state
        this.userFirstName = this.editProfile.value.editFirstName;
        this.userLastName = this.editProfile.value.editLastName;
        this.userEmail = this.editProfile.value.editEmail;
        // set session values
        this._commonUtils.setSessionField('userFirst', this.editProfile.value.editFirstName);
        this._commonUtils.setSessionField('userLast', this.editProfile.value.editLastName);
        this._commonUtils.setSessionField('userEmail', this.editProfile.value.editEmail);

      },
      error => {
        this.editProfileError = error.error.message;
      }
    )
    this.showModal = false;
  }
}
