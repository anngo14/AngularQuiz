import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  topic: string;
  available: string[] = ["topic1", "topic2", "topic3", "topic4", "topic5"];

  constructor(private d:DataService, private r: Router) { }

  ngOnInit() {
    this.d.userName.subscribe(data => {
      //if user is not logged on, they cannot access this page
      if(data === ''){
        this.r.navigate(['/error']);
      }
    });
  }
  chooseTopic(){
    this.d.changeTopic(this.topic);
    if(this.available.includes(this.topic))
    {
      this.r.navigate(['/quiz']);
    }
  }

}
