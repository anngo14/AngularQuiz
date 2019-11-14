import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

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

  constructor() { }

  changeUser(user: string) {
    this.messageSource.next(user);
  }
  changeTopic(topic: string) {
    this.defaultTopic.next(topic);
  }
}
