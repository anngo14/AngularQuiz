import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { topic } from '../models/topic';
import { score } from '../models/score';

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
  correct = this.defaultCorrect.asObservable();

  //incorrect observable
  private defaultIncorrect = new BehaviorSubject(0);
  incorrect = this.defaultIncorrect.asObservable();

  constructor() { }

  changeUser(user: string) {
    this.messageSource.next(user);
  }
  changeTopic(topic: string) {
    this.defaultTopic.next(topic);
  }
  changeScore(newScore: score){
    this.defaultCorrect.next(newScore.correct);
    this.defaultIncorrect.next(newScore.incorrect);
  }
}
