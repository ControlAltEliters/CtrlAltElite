import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

declare let $: any;

@Component({
  selector: 'app-user-friends',
  templateUrl: './user-friends.component.html',
  styleUrls: ['./user-friends.component.css']
})
export class UserFriendsComponent implements OnInit {

  user;
  selectedUser;
  users;
  userID;
  friendModal = false;

  username;
  name;
  email;

  friends;

  userForm: FormGroup = new FormGroup({
    selectedUser: new FormControl(null, Validators.required),
  });

  constructor(private _userService: UserService,) { }

  ngOnInit(): void {
    $('.ui.dropdown').dropdown();

    this.user = sessionStorage.getItem('activeUser');

    this._userService.listOfUsers().subscribe(
      (data) => {
        this.users = data;
        this.findFriends(data);
      },
      (error) => { console.log("ERROR"); }
    );
    this._userService.user().subscribe(
      (data) => this.findFriends(data),
      (error) => {}
    );
  }

    findFriends(data){
      console.log(data);
      if(data.friends.length) {
        this.friends = data.friends;
      }
      else {
        let friendsArray = [{username:"No friends added yet!"}];
        this.friends = friendsArray;
      }

    }

    selectUser(index){
      this.selectedUser = this.users[index];
      console.log(this.selectedUser);

      this.username = this.selectedUser.username;
      this.name = this.selectedUser.firstname + " " + this.selectedUser.lastname;
      this.email = this.selectedUser.email;

      $('#profileModal').modal('show');
    }

  displayEachUser(){
    this.users.forEach(member => {
      console.log(member.firstname)
    })
  }

  displayFriendModal(){
    $('#friendModal').modal('show');
  }

}
