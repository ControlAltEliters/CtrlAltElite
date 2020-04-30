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
  validusers = [];
  userID;
  friendModal = false;

  username;
  name;
  email;
  profilePic;
  friendID;

  friends;
  friendPics = [];
  hasFriends = true;

  adding = true;
  data;

  searchString: string;

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
        this.data = data;
      },
      (error) => {}
    );

    setTimeout(()=>{
      this.findFriends(this.data);
      this.displayEachUser();
    }, 500);
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

  removeFriend() {
    // remove friend from user friendArray
    this._userService.removefriend(this._commonUtils.readSessionField('userId'), this.username).subscribe(
      (data) => {
        window.location.reload();
      },
      (error) => {
        console.log(error);
      })
    // remove user from friend's friendArray
    this._userService.removefriend(this.friendID, this._commonUtils.readSessionField('activeUser')).subscribe(
      (data) => {
        window.location.reload();
      },
      (error) => {
        console.log(error);
      })
  }

  closeModal() {
    $('#friendModal').modal('hide');
  }

  findFriends(data){
    if(data.friends.length > 0) {
      this.friends = data.friends;

      this.users.forEach(member => {
        this.friends.forEach(friend => {
          if(friend == member.username)
          {
            switch (member.userImage) {
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

            this.friendPics.push({name:friend, pic:this.profilePic});
          }
        })
      })
    }
    else { this.hasFriends = false; }
  }

  showFriendInfo(index){
    this.users.forEach(member => {
      if(this.friendPics[index].name == member.username) {
        this.username = member.username;
        this.name = member.firstname + " " + member.lastname;
        this.email = member.email;

        switch (member.userImage) {
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

        this.adding = false;

        $('#profileModal').modal('show');
      }
    })
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

    this.adding = true;

    $('#profileModal').modal('show');
  }

  displayEachUser(){
    let foundFriend = 0;

    this.users.forEach(member => {
      this.friends.forEach(friend => {
        if(member.username == friend)
        {
          foundFriend = 1;
        }
      });
      if(foundFriend || member.username == this._commonUtils.readSessionField('activeUser')) {
        foundFriend = 0;
        console.log("FOUND FRIEND or SELF");
      }
      else {
        console.log("not friend: " + member.username);
        this.validusers.push(member);
      }
    })
  }

  displayFriendModal(){
    $('#friendModal').modal('show');
  }
}
