import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { topic } from '../models/topic';
import { topicName } from '../models/topicName';

@Injectable({
  providedIn: 'root'
})
export class TopicService {

  url: string = 'http://localhost:5000/api/topic';
  getUrl: string = 'http://localhost:5000/api/available?'
  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  getQuestions(topic:string){
    var topicJSON:topicName = {
      topic: topic
    }
    return this.http.post<topic[]>(this.url, topicJSON, this.httpOptions);
  }
  checkTopic(user:string, topic:string){
    return this.http.get<any>(this.getUrl.concat('user=' + user + '&topic=' + topic));
  }
}
