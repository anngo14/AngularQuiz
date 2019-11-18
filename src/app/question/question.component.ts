import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataService } from '../services/data.service';
import { TopicService } from '../services/topic.service';
import { Router } from '@angular/router';
import { ScoreService } from '../services/score.service';
import { score } from '../models/score';
import { transition, trigger, query, style, stagger, animate } from '@angular/animations';
import { topic } from '../models/topic';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css'],
  animations: [
    trigger('questionAnimation', [
      transition('* => *', [
        query(':self', style({ transform: 'translateX(-100%)' })),
        query(':self', animate('400ms', style({ transform: 'translateX(0)' })))
      ])
  ])
]
})
export class QuestionComponent implements OnInit, OnDestroy {
  //ngModule for two way binding
  answerChoices:any = [];
  
  subscription;
  topic: string;
  questionList:Array<topic>;
  correct:number = 0;
  incorrect:number = 0;

  constructor(private data:DataService, private s: TopicService, private r: Router, private score: ScoreService) { }

  ngOnInit() {
    this.subscription = this.data.userName.subscribe(user => {
      //if user is not logged on, they cannot access this page
      if(user === ''){
        this.r.navigate(['/error']);
      }
      this.data.topicSelected.subscribe(message => {
        this.topic = message;
        this.s.getQuestions(user, this.topic).subscribe(data => {
          if(data.status === 'not found'){
            this.r.navigate(['/notfound']);
          }else{
            this.questionList = data;
          }
        });
      })
    });
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  submitQuiz(){
    //Edge case for submitting the quiz early
    if(this.answerChoices.length < this.questionList.length){
      for(let i = this.answerChoices.length; i < this.questionList.length; i++){
        this.answerChoices.push(0);
      }
    }
    //Counts the number of correct and incorrect questions
    for(let i = 0; i < this.questionList.length; i++){
      if(this.questionList[i].answer === this.answerChoices[i]){
        this.correct += 1;
      }
      else{
        this.incorrect += 1;
      }
    }
    //Posts score json
    this.score.postScore(this.correct, this.incorrect).subscribe();
    let scoreObj:score = {
      correct: this.correct,
      incorrect: this.incorrect
    };
    this.r.navigate(['/thankyou']);
  }

}
