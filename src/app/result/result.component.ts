import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { Router } from '@angular/router';
import { ScoreService } from '../services/score.service';
import { score } from '../models/score';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {

  correct: number;
  incorrect: number;
  constructor(private data: DataService, private r:Router, private score: ScoreService) { }

  ngOnInit() {
    this.data.userName.subscribe(data => {
      //if user is not logged on, they cannot access this page
      if(data === ''){
        this.r.navigate(['/error']);
      }
    });
    this.score.getScore().subscribe(data => {
      this.correct = data.correct;
      this.incorrect = data.incorrect;
    });
  }
  backToHome(){
    this.r.navigate(['/home']);
  }
  retryQuiz(){
    this.r.navigate(['/quiz']);
  }

}
