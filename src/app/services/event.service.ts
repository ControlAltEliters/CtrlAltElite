import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Event } from 'src/app/server/models/Event.js';
import {environment} from '../../environments/environment';


@Injectable()
export class EventService {

    constructor(private _http: HttpClient) { }

    createEvent(body: any) {
        return this._http.post(environment.baseurl + '/events/createEvent', body, {
            observe: 'body',
            headers: new HttpHeaders().append('Content-Type', 'application/json')
        });
    }

    removeEvent(id: any) {
      return this._http.post(environment.baseurl + '/events/removeEvent', {
        observe: 'body',
        headers: new HttpHeaders().append('Content-Type', 'application/json'),
        params: {
          id
        }
      });
    }

    editEvent(body: any) {
      return this._http.post(environment.baseurl + '/events/editEvent', body, {
          observe: 'body',
          headers: new HttpHeaders().append('Content-Type', 'application/json')
      });
  }

    event() {
        return this._http.get(environment.baseurl + '/events/events', {
          observe: 'body',
          headers: new HttpHeaders().append('Content-Type', 'application/json'),
          withCredentials: true
        });
    }

    eventPuller() {
      return this._http.get(environment.baseurl + '/events/event-puller', {
        observe: 'body',
        headers: new HttpHeaders().append('Content-Type', 'application/json'),
      });
    }


    join(user: any) {
        return this._http.post(environment.baseurl + '/events/join', user, {
            observe: 'body',
            headers: new HttpHeaders().append('Content-Type', 'application/json')
        });
    }

    leave(user: any) {
      return this._http.post(environment.baseurl + '/events/leave', user, {
        observe: 'body',
        headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
    }

}
