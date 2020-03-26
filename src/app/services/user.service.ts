import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';


@Injectable()
export class UserService {

  constructor(private _http:HttpClient) { }

  register(body:any){
    return this._http.post(environment.baseurl + '/users/register',body,{
      observe:'body',
      headers:new HttpHeaders().append('Content-Type','application/json')
    });
  }

  login(body:any){
    return this._http.post(environment.baseurl + '/users/login',body,{
      observe:'body',
      headers:new HttpHeaders().append('Content-Type','application/json'),
      withCredentials:true,
    });
  }

  user(){
    return this._http.get(environment.baseurl + '/users/user',{
      observe:'body',
      headers:new HttpHeaders().append('Content-Type','application/json'),
      withCredentials: true
    })
  }

  logout(){
    return this._http.get(environment.baseurl + '/users/logout',{
      observe:'body',
      headers:new HttpHeaders().append('Content-Type','application/json'),
      withCredentials:true
    })
  }

  editProfile(body:any){
    return this._http.post(environment.baseurl + '/users/editprofile',body,{
      observe:'body',
      headers:new HttpHeaders().append('Content-Type','application/json'),
      withCredentials:true
    })
  }
}
