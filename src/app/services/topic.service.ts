import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { topic } from '../models/topic';
import { topicName } from '../models/topicName';

@Injectable({
  providedIn: 'root'
})
export class TopicService {

  url: string = 'http://localhost:4500/topic?'
  constructor(private http: HttpClient) { }

  getQuestions(user:string, topic:string){
    return this.http.get<any>(this.url.concat('user=' + user + '&topic=' + topic));
  }
}
