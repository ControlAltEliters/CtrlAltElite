import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonUtils } from 'src/app/utils/common-utils';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-account-page',
  templateUrl: './account-page.component.html',
  styleUrls: ['./account-page.component.css'],
})
export class AccountPageComponent implements OnInit {
  activeUser: string;
  profilePic: string;
  num_of_friends: Number;
  data;
  friends;
  users;

  constructor(private _router: Router, private _commonUtils: CommonUtils, private _userService: UserService,) {}

  ngOnInit(): void {
    this.activeUser = this._commonUtils.readSessionField('activeUser');
    this.profilePic = this._commonUtils.readSessionField('profilePic');
    this._userService.user().subscribe(
      (data) => {
        this.data = data;
      },
      (error) => {}
    );

    setTimeout(()=>{
      this.findFriends(this.data);
    }, 700);

  }

  findFriends(data){
    var count = 0;
    console.log(data.friends.length)
    if(data.friends.length > 0) {
      this.friends = data.friends;
      console.log("friends: " + this.friends);

        this.friends.forEach(friend => {
          count++;
        })
    }
    this.num_of_friends = count;
  }

}
