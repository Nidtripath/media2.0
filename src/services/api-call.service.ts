import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class ApiCallService {

  constructor(private http: HttpClient) { }
  
    // private _baseUrl = "http://localhost:8000/";
    private _baseUrl = "http://Ticker-nodejs-1752504139.ap-south-1.elb.amazonaws.com/";
    headers = { "Content-type": "application/json" };
  
    startad(): Observable<any> {
      return this.http.get(this._baseUrl + "ad", { headers: this.headers });
    }
  
    startOverLay(): Observable<any> {
      return this.http.get(this._baseUrl + "over", { headers: this.headers });
    }
    restoreTicker(): Observable<any> {
      return this.http.get(this._baseUrl + "restoreTicker", { headers: this.headers });
    }
  }
  
