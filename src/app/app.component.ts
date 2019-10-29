import { Component } from '@angular/core';
import { DataService } from './services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'QuizAngular';
  username: string;

  constructor(private data: DataService, private r: Router){}

  ngOnInit() {
    this.data.userName.subscribe(message => this.username = message);
  }

  logoutUser(){
    this.data.changeUser('');
    this.r.navigate(['/logout']);
  }
}
