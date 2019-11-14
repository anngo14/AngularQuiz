import { Component, OnInit } from '@angular/core';
import { ScoreService } from '../services/score.service';
import { DataService } from '../services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-thankyou',
  templateUrl: './thankyou.component.html',
  styleUrls: ['./thankyou.component.css']
})
export class ThankyouComponent implements OnInit {
  message:string;

  constructor(private s:ScoreService, private d:DataService, private r:Router) { }

  ngOnInit() {
    this.d.userName.subscribe(data => {
      //if user is not logged on, they cannot access this page
      if(data === ''){
        this.r.navigate(['/error']);
      }
    });
    this.s.completeQuiz().subscribe(data => {
      this.message = data.message;
    })
  }

}