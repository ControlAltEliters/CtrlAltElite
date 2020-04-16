import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class SubscribeService {
  mailChimpEndpoint = 'https://yahoo.us4.list-manage.com/subscribe/post?u=c6d013547c538d10928b345aa&amp;id=bd29ee260e';
  constructor(
    private http: HttpClient
  ) { }
  subscribeToList(data) {
    const params = new HttpParams()
      .set('EMAIL', data.email)
      .set('group[56908][1]', 'true')
      .set('b_c6d013547c538d10928b345aa_bd29ee260e', '');
    const mailChimpUrl = `${this.mailChimpEndpoint}&${params.toString()}`;
    return this.http.jsonp(mailChimpUrl, 'c')
  }
}
