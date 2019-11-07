import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {

  correct: number;
  incorrect: number;
  constructor(private data: DataService, private r:Router) { }

  ngOnInit() {
    this.data.userName.subscribe(data => {
      //if user is not logged on, they cannot access this page
      if(data === ''){
        this.r.navigate(['/error']);
      }
    });
    this.data.correctAnwers.subscribe(data => this.correct = data);
    this.data.incorrectAnswers.subscribe(data => this.incorrect = data);
  }
  backToHome(){
    this.r.navigate(['/home']);
  }
  retryQuiz(){
    this.r.navigate(['/quiz']);
  }

}
