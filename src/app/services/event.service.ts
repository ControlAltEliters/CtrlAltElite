import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable()
export class EventService {

  constructor(private _http:HttpClient) { }

  createEvent(body:any){
    return this._http.post('http://127.0.0.1:3000/events',body,{
      observe:'body',
      headers:new HttpHeaders().append('Content-Type','application/json')
    });
  }

}