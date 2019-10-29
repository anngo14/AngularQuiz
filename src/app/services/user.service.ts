import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { users } from '../models/user';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  url: string = 'http://localhost:5000/api/users';
  constructor(private http: HttpClient) { }

  getusers(): Observable<users>{
    return this.http.get<users>(this.url);
  }
}
