import { Component, Input, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonUtils } from 'src/app/utils/common-utils';
import { NotifierService } from "angular-notifier";


declare let $: any;

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  userFirstName: string;
  userLastName: string;
  userName: string;
  userEmail: string;
  userPassword: string;
  editProfileError: string;
  updatePasswordError: string;
  showErrorMessage: Boolean;
  successMessage: string;
  showSuccessMessage: Boolean;

  private readonly notifier: NotifierService;


  editProfile: FormGroup = new FormGroup({
    editFirstName: new FormControl(null),
    editLastName: new FormControl(null),
    editEmail: new FormControl(null),
    userId: new FormControl(null),
  });

  updatePassword: FormGroup = new FormGroup({
    oldPassword: new FormControl(null),
    newPassword: new FormControl(null),
    confirmedNewPassword: new FormControl(null),
    userId: new FormControl(null),
  });

  constructor(
    private _router: Router,
    private _userService: UserService,
    private _commonUtils: CommonUtils,
    private notifierService: NotifierService
  ) {this.notifier = notifierService;}

  ngOnInit(): void {
    // set local state
    this.userFirstName = this._commonUtils.readSessionField('userFirst');
    this.userLastName = this._commonUtils.readSessionField('userLast');
    this.userName = this._commonUtils.readSessionField('activeUser');
    this.userEmail = this._commonUtils.readSessionField('userEmail');
    // prepare form
    this._commonUtils.setFormFieldValue(
      this.editProfile,
      'editFirstName',
      this.userFirstName
    );
    this._commonUtils.setFormFieldValue(
      this.editProfile,
      'editLastName',
      this.userLastName
    );
    this._commonUtils.setFormFieldValue(
      this.editProfile,
      'editEmail',
      this.userEmail
    );
    this._commonUtils.setFormFieldValue(
      this.editProfile,
      'userId',
      this._commonUtils.readSessionField('userId')
    );
    this._commonUtils.setFormFieldValue(
      this.updatePassword,
      'userId',
      this._commonUtils.readSessionField('userId')
    );

    this.showErrorMessage = false;
    this.showSuccessMessage = false;
  }

  displayInfoModal() {
    $('#editProfileModal').modal('show');
  }

  displayPasswordModal() {
    $('#editPasswordModal').modal('show');
  }

  editUserProfile() {
    if (!this.editProfile.valid) {
      this.editProfileError = 'Invalid Form';
      console.log('Invalid Form');
      return;
    }
    this._userService
      .editProfile(JSON.stringify(this.editProfile.value))
      .subscribe(
        (data) => {
          // set local state
          this.userFirstName = this.editProfile.value.editFirstName;
          this.userLastName = this.editProfile.value.editLastName;
          this.userEmail = this.editProfile.value.editEmail;
          // set session values
          this._commonUtils.setSessionField(
            'userFirst',
            this.editProfile.value.editFirstName
          );
          this._commonUtils.setSessionField(
            'userLast',
            this.editProfile.value.editLastName
          );
          this._commonUtils.setSessionField(
            'userEmail',
            this.editProfile.value.editEmail
          );
        },
        (error) => {
          this.editProfileError = error.error.message;
        }
      );
      this.notifier.notify("success", "Information updated!");
  }

  updateUserPassword() {
    if (!this.updatePassword.valid) {
      this.updatePasswordError = 'Invalid Form';
      console.log('Invalid Form');
      return;
    }
    this._commonUtils.setSessionField('flag', '0');
    this._commonUtils.setSessionField('id', JSON.stringify(this.updatePassword.value.userId));
    this._commonUtils.setSessionField('newpass', JSON.stringify(this.updatePassword.value.newPassword));
    this._userService.verifyPassword(this.updatePassword.value.oldPassword, this.updatePassword.value.newPassword, this.updatePassword.value.confirmedNewPassword, this.updatePassword.value.userId).subscribe((resp: any) => {
        if (resp.body.result) {
          if (resp.body.newpass === resp.body.confnewpass) {
            if (resp.body.newpass != 'null') {
              this._commonUtils.setSessionField('flag', '1');
              this.showErrorMessage = false;
              // this.successMessage = 'Successfully updated password!';
              this.notifier.notify("success", "Password updated! Please login with new password.");
              this.showSuccessMessage = true;
            } else {
              this._commonUtils.setSessionField('flag', '0');
              this.updatePasswordError = 'Fields 2 and 3 cannot be empty. Please try again.';
              this.showErrorMessage = true;
            }
          } else {
            this._commonUtils.setSessionField('flag', '0');
            this.updatePasswordError = 'Fields 2 and 3 do not match. Please try again.';
            this.showErrorMessage = true;
          }
        } else {
          this._commonUtils.setSessionField('flag', '0');
          this.updatePasswordError =
            'Field 1 does not match current password. Please try again.';
          this.showErrorMessage = true;
        }
        setTimeout(() => {
          this.showErrorMessage = false;
        }, 2000);
      });
    setTimeout(() => {
      if (this._commonUtils.readSessionField('flag') === '1') {
        this._commonUtils.setSessionField('flag', '0');
        this.update();
        this.logout();
      }
    }, 1000);

    this.updatePassword.reset();
  }

  update() {
    this._userService
      .updatePassword(
        this._commonUtils.readSessionField('id'),
        this._commonUtils.readSessionField('newpass')
      )
      .subscribe(
        data => { console.log(data); },
        error => { this.updatePasswordError = error.error.message; this.showErrorMessage = true; this.showSuccessMessage = false; }
    );
  }

  logout() {
    $('#editPasswordModal').modal('hide');
    // this doesn't hide the modal after the first passw change, although passw update successful
    this._userService.logout().subscribe(
      (data) => {
        sessionStorage.setItem('activeUser', '');
        this._router.navigate(['login']);
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
