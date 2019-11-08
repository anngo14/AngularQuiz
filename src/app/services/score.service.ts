import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { score } from '../models/score';

@Injectable({
  providedIn: 'root'
})
export class ScoreService {

  url: string = 'http://localhost:5000/api/score';
  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  postScore(c: number, i: number){
    let scoreJSON:score = {
      correct: c,
      incorrect: i
    };
    return this.http.post<score>(this.url, scoreJSON, this.httpOptions);
  }
}
