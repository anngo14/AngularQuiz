import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { TopicService } from '../services/topic.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {

  //ngModule for two way binding
  answerChoices:any = [];
  
  topic: string;
  questionList;
  correct:number = 0;
  incorrect:number = 0;

  constructor(private data:DataService, private s: TopicService, private r: Router) { }

  ngOnInit() {
    this.data.userName.subscribe(data => {
      //if user is not logged on, they cannot access this page
      if(data === ''){
        this.r.navigate(['/error']);
      }
    });
    this.data.topicSelected.subscribe(message => {
      this.topic = message;
      this.s.postTopic(this.topic).subscribe(data => this.questionList = data);
    });
  }
  submitQuiz(){
    //Edge case for submitting the quiz early
    if(this.answerChoices.length < 5){
      for(let i = this.answerChoices.length; i < 5; i++){
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
    this.data.changeCorrect(this.correct);
    this.data.changeIncorrect(this.incorrect);
    this.r.navigate(['/thankyou']);
  }

}
