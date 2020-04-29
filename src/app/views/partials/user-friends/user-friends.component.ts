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

  user
  selectedUser
  users = []
  userID
  friendModal = false

  userForm: FormGroup = new FormGroup({
    selectedUser: new FormControl(null, Validators.required),
  });

  constructor(private _userService: UserService,) { }

  ngOnInit(): void {
    $('.ui.dropdown').dropdown();
    this.user = sessionStorage.getItem('activeUser');
    this._userService.listOfUsers().subscribe(
      (data) => this.dealWithUser(data),
      (error) => {}
    );
    this._userService.user().subscribe(
      (data) => this.findFriends(data),
      (error) => {}
    );
  }

  dealWithUser(data) {
    console.log(data)
    this.users = data
  }

    findFriends(data){
  //   console.log(data)
    }

    selectUser(index){
      this.selectUser = this.users[index]
      console.log(this.selectUser)
      $('#secondModal').modal('show');
      
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
