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
  public showInfoModal = false;
  public showPasswordModal = false;
  userFirstName: string;
  userLastName: string;
  userName: string;
  userEmail: string;
  userPassword: string;
  editProfileError: string;
  updatePasswordError: string;

  editProfile: FormGroup = new FormGroup({
    editFirstName:new FormControl(null),
    editLastName:new FormControl(null),
    editEmail:new FormControl(null),
    userId: new FormControl(null)
  })

  updatePassword: FormGroup = new FormGroup({
    oldPassword:new FormControl(null),
    newPassword: new FormControl(null),
    confirmedNewPassword: new FormControl(null),
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
    this._commonUtils.setFormFieldValue(this.updatePassword, 'userId', this._commonUtils.readSessionField('userId'));
  }

  displayInfoModal(){
    this.showInfoModal = true;
  }

  displayPasswordModal() {
    this.showPasswordModal = true;
  }

  hideModal(){
    this.showInfoModal = false;
    this.showPasswordModal = false;
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
    this.showInfoModal = false;
  }

  updateUserPassword(){
    console.log("start id: " + this.updatePassword.value.userId);
    if (!this.updatePassword.valid) {
      this.updatePasswordError = "Invalid Form";
      console.log('Invalid Form');
      return;
    }

    this._commonUtils.setSessionField('flag', "0");
    this._commonUtils.setSessionField('id', JSON.stringify(this.updatePassword.value.userId));
    this._commonUtils.setSessionField('newpass', JSON.stringify(this.updatePassword.value.newPassword));

    this._userService.verifyPassword(this.updatePassword.value.oldPassword, this.updatePassword.value.newPassword, this.updatePassword.value.confirmedNewPassword, this.updatePassword.value.userId).subscribe((resp)=>{
      if (resp.body["result"]) {
        if (resp.body["newpass"] === resp.body["confnewpass"]) {
          // console.log("updating password");
          this._commonUtils.setSessionField('flag', "1");
          alert("password updated");
          // this._userService.updatePassword(this.updatePassword.value.newPassword);
          // console.log("updated password");
        }
        else {
          this._commonUtils.setSessionField('flag', "0");
          alert("New password and re-entered password not the same. Please try again.");
        }
      }
      else {
        this._commonUtils.setSessionField('flag', "0");
        alert("Entered old password doesn't match current password.");
      }
    });

    setTimeout(()=>{
      console.log("flag: " + this._commonUtils.readSessionField('flag'));
      console.log("id: " + this._commonUtils.readSessionField('id'));
      console.log("newpass: " + this._commonUtils.readSessionField('newpass'));
      if (this._commonUtils.readSessionField('flag')) {
        this.update();
      }
    }, 1000);

    this.updatePassword.reset();
    this.showPasswordModal = false;
  }

  update(){
    console.log("2id: " + this._commonUtils.readSessionField('id'));
    console.log("2newpass: " + this._commonUtils.readSessionField('newpass'));
    this._userService.updatePassword(this._commonUtils.readSessionField('id'), this._commonUtils.readSessionField('newpass'))
      .subscribe(
      data => { console.log(data); }
    );
  }
}
