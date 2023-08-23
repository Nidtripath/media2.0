import { Injectable } from '@angular/core';
import { catchError, Subject, map, Observable, throwError, from } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import * as Rx from "rxjs"; 

@Injectable({
  providedIn: 'root'
  
})
export class WsresponseService {

  messageObservable;
  statsObservable;
  socket: any;
  CHAT_URL = "wss://caas.hashedin.com";
  apiURL = 'https://caas.hashedin.com';
  public message: Subject<any>;

  private subject!: Rx.Subject<MessageEvent>;

  constructor(private http: HttpClient) {
    this.messageObservable = <BehaviorSubject<any>>new BehaviorSubject('');
    this.statsObservable = <BehaviorSubject<any>>new BehaviorSubject('');
    this.message = <Subject<any>>this.connect(this.CHAT_URL+"/CAAS/team_info").pipe(
      map(
        (response: MessageEvent): any => {
          // console.log("team data:",response);
          let data = JSON.parse(response.data)
          return data;
        }
      )
     );

    //  this.players = <Subject<any>>this.connect(this.CHAT_URL+"/CAAS/stats").pipe(
    //   map(
    //     (response: MessageEvent): any => {
    //       console.log("players data:",response);
    //       let data = JSON.parse(response.data)
    //       return data;
    //     }
    //   )
    //  );

    

    
     //  this.stats = <Subject<any>>this.connect(this.CHAT_URL).pipe(
    //   map((response: MessageEvent): any => {
    //     let data = JSON.parse(response.data);
    //     return data;
    //   }
    //   )
    //   );

    // this.messages = <Subject<any>>this.connect(this.CHAT_URL +'/CAAS/team_info').pipe(
    //   map(
    //     (response: MessageEvent): any => {
    //       console.log("team data:",response);
    //       let data = JSON.parse(response.data)
    //       return data;
    //     }
    //   )
    //  );

   }

   public connect(url: string): Rx.Subject<MessageEvent> {
    if (!this.subject) {
      this.subject = this.create(url);
      console.log("Successfully connected: " + url);
    }
    return this.subject;
  }
  private create(url: string): Rx.Subject<MessageEvent> {
    let ws = new WebSocket(url);

    let observable = Rx.Observable.create((obs: Rx.Observer<MessageEvent>) => {
      ws.onmessage = obs.next.bind(obs);
      ws.onerror = obs.error.bind(obs);
      ws.onclose = obs.complete.bind(obs);
      return ws.close.bind(ws);
    });
    let observer = {
      next: (data: Object) => {
        if (ws.readyState === WebSocket.OPEN) {
          ws.send(JSON.stringify(data));
        }
      }
    };
    return Rx.Subject.create(observer, observable);
  }

  getBatters(matchId: number, teamId: number): Observable<any[]> {
    return this.http
      .get<any[]>(`${this.apiURL}/players/yet_to_bat/`, {
        params: {
          match_id: matchId,
          team_id: teamId,
        }
      }).pipe(catchError(this.handleError));

    }

    getBowler(teamId: number): Observable<any[]> {
      return this.http
      .get<any[]>(`${this.apiURL}/Teamplayers/${teamId}`).pipe(catchError(this.handleError));

    }

    getInningDetails(teamId: number, matchId: number): Observable<any> {
      return this.http
        .get<any>(`${this.apiURL}/refresh_inning`, {
          params: {
            match_code: matchId,
            team_id: teamId
          }
        }).pipe(catchError(this.handleError));
    }


  handleError(error: any): Observable<never> {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(() => {
      return errorMessage;
    });
  }


}
