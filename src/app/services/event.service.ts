import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class EventService {

    constructor(private _http: HttpClient) { }

    createEvent(body: any) {
        return this._http.post('http://127.0.0.1:3000/events/createEvent', body, {
            observe: 'body',
            headers: new HttpHeaders().append('Content-Type', 'application/json')
        });
    }

    event() {
        return this._http.get('http://127.0.0.1:3000/events/event', {
            observe: 'body',
            withCredentials: true,
            headers: new HttpHeaders().append('Content-Type', 'application/json')
        });
    }

}