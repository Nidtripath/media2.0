import { Injectable } from '@angular/core';
import { catchError, Subject, map, Observable, throwError, from } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import * as Rx from "rxjs"; 
import { BallLog } from '../../app/modal/ball-log.model';
import OBSWebSocket, {
  OBSRequestTypes,
  OBSResponseTypes,
} from 'obs-websocket-js';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  socket: any;
  CHAT_URL = "wss://caas.hashedin.com";
  apiURL = 'https://caas.hashedin.com';

  ballData!: any;
  firstTeamName: string = '';
  secondTeamName: string = '';
  bowlerName!: string;
  bowlerOver!: number;
  bowlerWickets!: number;
  bowlerBall!: number;
  bowlerEconomy!: string;
  totalScore!: number;
  totalWicket!: number;
  battingTeam: string = '';
  bowlingTeam: string = '';
  striker!: string;
  strikerBalls!: number;
  nonstriker!: string;
  strikerRuns!: number;
  nonStrikerRuns!: number;
  nonStrikerBalls!: number;
  totalOvers!: number;
  currentOvers!: number;
  currentBall!: number;
  broadcast: boolean = false;

  public stats: Subject<any>;
  ballLogs: Array<BallLog> = [];

  private subject!: Rx.Subject<MessageEvent>;

  public obs = new OBSWebSocket();
  public connectionSubject = new Subject<boolean>();
  ObsConnectionStatus: boolean = false;

  constructor() {

     this.stats = <Subject<any>>this.connect(this.CHAT_URL+"/websocket").pipe(
      map(
        (response: MessageEvent): any => {
          console.log("web socket response:",response);
          let data = JSON.parse(response.data);
          data = data[data.length-1];
          this.ballData = data;
          return data;
        }
      )
     );
  }

  
  /**
   * This function is for creating websocket connection with OBS
   * @param obsUrl obs url to be connected
   * @param obsPassword password for connecting to obs
   */
  async obsConnection(obsUrl: string, obsPassword: string) {
    await this.obs.connect(`ws://localhost:${obsUrl}`, obsPassword, {
      rpcVersion: 1,
    });
    /**
     * Here we are setting the connection status based on the socket
     */
    this.obs.on('ConnectionOpened', () => {
      console.log('WebSocket connection opened');
      this.ObsConnectionStatus = true;

    });
    this.obs.on('ConnectionClosed', () => {
      console.log('WebSocket connection closed');
      this.ObsConnectionStatus = false; // Perform actions when the connection is closed
    });

    this.obs.call('StartReplayBuffer');
    
  }

  async switchToReplay() {
    this.obs.call('SetCurrentProgramScene', { 'sceneName': 'Replay' });
    var replayPath = this.obs.call('GetLastReplayBufferReplay');
    var savedPath = (await replayPath).savedReplayPath;
  }

  triggerReplay() {
    this.obs.call('SaveReplayBuffer');
    setTimeout(this.switchToReplay, 3000);
  }

  sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  


  wsFunctionCall() {
    this.stats.subscribe((data) => {
      
      console.log("web service live stats ",data);
      // data = JSON.parse(data);
      this.bowlerName = data.bowler_name;
      // console.log("Bowler name ",this.bowlerName);
      this.bowlerBall = data.bowler_overs;
      // console.log("Bowler Ball ",this.bowlerBall);
      this.bowlerOver = Math.floor(this.bowlerBall / 6);
      this.bowlerBall = this.bowlerBall % 6;
      this.bowlerWickets = data.bowler_wickets;
      this.bowlerEconomy = data.bowler_economy;
      this.totalScore = data.total_score;
      this.totalOvers = data.total_overs;
      this.currentOvers = data.current_over;
      this.currentBall = data.display_balls;
      // console.log("Score ",this.totalScore);
      this.totalWicket = data.total_wicket;
      this.battingTeam = data.batting_team_name;
      this.bowlingTeam = data.bowling_team_name;
      this.striker = data.striker_name;
      this.strikerBalls = data.player_ball_played;
      this.nonstriker = data.nonstriker_name;
      this.strikerRuns = data.player_runs;
      this.nonStrikerRuns = data.nonStrikerScore;
      this.nonStrikerBalls = data.nonStrikerBalls;
      console.log("Striker ",this.striker);
      this.fillBalls(this.ballData);

    })
  }

  async fillBalls(balls: any) {
    var ballLog = new BallLog();
    ballLog.run = balls.run;
    ballLog.extra_run = balls.extra_run;
    ballLog.bowler_id = balls.bowler_id;
    ballLog.batsman_id = balls.striker_id;
    ballLog.is_jackpot_ball = balls.is_jackpot_ball;
    ballLog.isWicket = balls.isWicket;
    ballLog.is_boundary = balls.is_boundary;
    ballLog.is_bye_run = balls.is_bye_run;
    ballLog.is_wide_ball = balls.is_wide_ball;
    ballLog.is_no_ball = balls.is_no_ball;
    ballLog.is_dot_one_run = balls.is_dot_one_run;
    ballLog.is_two_runs = balls.is_two_runs;
    ballLog.is_four_runs = balls.is_four_runs;
    ballLog.is_six_runs = balls.is_six_runs;
    ballLog.is_freeHit = balls.is_freeHit;
    ballLog.is_Batsman_retd = balls.is_Batsman_retd;
    ballLog.is_three_runs = balls.is_three_runs;
    ballLog.is_five_seven_runs = balls.is_five_seven_runs;
    ballLog.dont_count_ball = balls.dont_count_ball;
    ballLog.display_ball = balls.display_balls;
    this.ballLogs.push(ballLog);
    if(ballLog.display_ball == 0) this.ballLogs = [];
    console.log("Ball Logs ", this.ballLogs);

    if(this.broadcast && (ballLog.is_boundary || ballLog.isWicket)) {
      
      try{
      this.obs.call('SaveReplayBuffer');
      await this.sleep(3000);
      this.obs.call('SetCurrentProgramScene', { 'sceneName': 'Replay' });
      var replayPath = this.obs.call('GetLastReplayBufferReplay');
      var savedPath = (await replayPath).savedReplayPath;
      // console.log("Replay path ",savedPath);
      // this.obs.call('SaveReplayBuffer');
      // await this.sleep(3000);
      } catch(err) {
        console.log("Could not do obs operations");
      }
    }
    
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
