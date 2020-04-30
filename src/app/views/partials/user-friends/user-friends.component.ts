import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CommonUtils } from 'src/app/utils/common-utils';

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
  profilePic;
  friendID;

  friends;
  hasFriends = true;

  userForm: FormGroup = new FormGroup({
    selectedUser: new FormControl(null, Validators.required),
  });

  constructor(private _userService: UserService, private _commonUtils: CommonUtils) { }

  ngOnInit(): void {
    $('.ui.dropdown').dropdown();

    this.user = sessionStorage.getItem('activeUser');

    this._userService.listOfUsers().subscribe(
      (data) => {
        this.users = data;
      },
      (error) => { console.log("ERROR"); }
    );
    this._userService.user().subscribe(
      (data) => {
        this.findFriends(data)},
      (error) => {}
    );
  }

  addFriend(){
    // add friend to user friendArray
    this._userService.addfriend(this._commonUtils.readSessionField('userId'), this.username).subscribe(
      (data)=>{
        window.location.reload();
    },
    (error)=>{
      console.log(error);
    })
    // add user to friend's friendArray
    this._userService.addfriend(this.friendID, this._commonUtils.readSessionField('activeUser')).subscribe(
      (data) => {
        window.location.reload();
      },
      (error) => {
        console.log(error);
      })
  }

  findFriends(data){
    if(data.friends.length > 0) {
      this.friends = data.friends;
      console.log("friends: " + this.friends);
    }
    else { this.hasFriends = false; }
  }

  selectUser(index){
    this.selectedUser = this.users[index];
    console.log(this.selectedUser);

    this.username = this.selectedUser.username;
    this.name = this.selectedUser.firstname + " " + this.selectedUser.lastname;
    this.email = this.selectedUser.email;
    this.friendID = this.selectedUser._id;

    switch (this.selectedUser.userImage) {
      case "1":
        this.profilePic = "../../../../assets/images/bulbasaur.png";
        break;
      case "2":
        this.profilePic = "../../../../assets/images/charmander.png";
        break;
      case "3":
        this.profilePic = "../../../../assets/images/eevee.png";
        break;
      case "4":
        this.profilePic = "../../../../assets/images/jigglypuff.png";
        break;
      case "5":
        this.profilePic = "../../../../assets/images/meowth.png";
        break;
      case "6":
        this.profilePic = "../../../../assets/images/pikachu.png";
        break;
      case "7":
        this.profilePic = "../../../../assets/images/snorlax.png";
        break;
      default:
        this.profilePic = "../../../../assets/images/default.png";
        break;
    }

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
