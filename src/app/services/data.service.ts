import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { topic } from '../models/topic';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  //username observable
  private messageSource = new BehaviorSubject('');
  userName = this.messageSource.asObservable();

  //topic observable
  private defaultTopic = new BehaviorSubject('');
  topicSelected = this.defaultTopic.asObservable();

  //correct observable
  private defaultCorrect = new BehaviorSubject(0);
  correctAnwers = this.defaultCorrect.asObservable();

  //incorrect observable
  private defaultIncorrect = new BehaviorSubject(0);
  incorrectAnswers = this.defaultIncorrect.asObservable();

  constructor() { }

  changeUser(user: string) {
    this.messageSource.next(user);
  }
  changeTopic(topic: string) {
    this.defaultTopic.next(topic);
  }
  changeCorrect(correct: number){
    this.defaultCorrect.next(correct);
  }
  changeIncorrect(incorrect: number){
    this.defaultIncorrect.next(incorrect);
  }
}
