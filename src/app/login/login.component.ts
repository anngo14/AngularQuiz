import { Component, OnInit} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import { UserService } from '../services/user.service';
import { user } from '../models/user';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  userInput = '';
  passInput = '';
  username = new FormControl('', [Validators.required]);
  password = new FormControl('', [Validators.required]);
  userEntered: user;
  userList: user[];
  users;
  error:boolean = false;

  constructor(private s: UserService, private r: Router, private d: DataService) { }
  
  getErrorMessage() {
    return this.username.hasError('required') ? 'You must enter a value' :
        this.password.hasError('required') ? 'You must enter a value' :
            '';
  }
  ngOnInit() {
    this.s.getusers().subscribe(data => this.users = data);
  }

  //returns index of user entered from list of users
  checkUser(): number{
    //Creates a user based on input
    this.userEntered = {
      username: this.userInput,
      password: this.passInput
    };
    //Sets the array of all users 
    this.userList = this.users.users;
    let index = -1;
    for(let i = 0; i < this.userList.length; i++){
      if(this.userList[i].username === this.userEntered.username && this.userList[i].password === this.userEntered.password){
        index = i;
      }
    }
    return index;
  }
  //redirect
  redirectToHome(){
    if(this.checkUser() != -1)
    {
      this.changeUsername();
      this.r.navigate(['/home']);
    }
    else{
      //error message
      this.error = true;
    }
  }
  //changes the username on the toolbar
  changeUsername(){
    this.d.changeUser(this.userEntered.username);
  }
}
