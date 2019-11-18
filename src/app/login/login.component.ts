import { Component, OnInit} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';
import { transition, trigger, query, style, animate, state, keyframes } from '@angular/animations';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [
    trigger('failedLoginAnimation', [
      state('true', style({})),
      state('false', style({})),
      transition('* => true', animate("250ms", keyframes([
        style({transform: 'translateX(5%)'}),
        style({transform: 'translateX(0%)'}),
        style({transform: 'translateX(-5%)'}),
        style({transform: 'translateX(0%)'}),
        style({transform: 'translateX(5%)'}),
        style({transform: 'translateX(0%)'}),
        style({transform: 'translateX(-5%)'}),
        style({transform: 'translateX(0%)'})
      ]))),
    ])
  ]
})
export class LoginComponent implements OnInit {
  userInput = '';
  passInput = '';
  username = new FormControl('', [Validators.required]);
  password = new FormControl('', [Validators.required]);
  error:boolean = false;

  constructor(private s: UserService, private r: Router, private d: DataService) { }
  
  getErrorMessage() {
    return this.username.hasError('required') ? 'You must enter a value' :
        this.password.hasError('required') ? 'You must enter a value' :
            '';
  }
  ngOnInit() {}

  //redirect
  redirectToHome(){
    this.s.getusers(this.userInput, this.passInput).subscribe( data => {
      if(data.status === "success"){
        this.changeUsername(this.userInput);
        this.r.navigate(['/home']);
      }
      else{
        //error message
        this.error = true;
        setTimeout(() => {this.error = false}, 2500);
      }
    });
  }
  //changes the username on the toolbar
  changeUsername(user){
    this.d.changeUser(user);
  }
}
