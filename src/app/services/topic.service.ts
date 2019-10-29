import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { topic } from '../models/topic';

@Injectable({
  providedIn: 'root'
})
export class TopicService {

  url: string = 'http://localhost:5000/api/topics/';
  constructor(private http: HttpClient) { }

  getQuestions(topicNum:string){
    return this.http.get<topic[]>(this.url.concat(topicNum));
  }
}
