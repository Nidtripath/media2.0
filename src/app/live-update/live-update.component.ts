import { Component } from '@angular/core';
import { WsresponseService } from '../../services/wsresponse.service';
import { HttpClient } from '@angular/common/http';
import { WebsocketService } from '../../services/websocket/websocket.service';
import { Observable, Subject, throwError, map, catchError } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-live-update',
  templateUrl: './live-update.component.html',
  styleUrls: ['./live-update.component.css']
})
export class LiveUpdateComponent {


  firstTeamName!: string;
  firstTeamLogo!: string;
  secondTeamName!: string;
  secondTeamLogo!: string;
  battingTeamName!: string;
  battingTeamLogo!: string;
  bowlingTeamName!: string;
  bowlingTeamLogo!: string;
  bowlerName!: string;
  bowlerOver!: number;
  bowlerWickets!: number;
  bowlerBall!: number;
  totalScore!: number;
  totalWicket!: number;
  battingTeam!: string;
  striker!: string;
  nonstriker!: string;
  strikerRuns!: number;
  nonStrikerRuns!: number;
  firstTLogoInitials!: string[];
  secondTLogoInitials!: string[];
  
    
    constructor(public wsService: WebsocketService, 
      private wsRespnse: WsresponseService, 
      private http: HttpClient,
      private router: Router,
      ) {
      this.firstTeamName =  "First Team";
      this.secondTeamName = "Second Team";
      this.firstTeamLogo = "";
      this.secondTeamLogo = "";
  
    }


ngOnInit() {
  this.wsRespnse.message.subscribe((data) => {
    this.firstTeamName = data.Team1;
    this.secondTeamName = data.Team2;
    this.firstTeamLogo = data.Team1_logo;
    this.secondTeamLogo = data.Team2_logo; 
      });

      // this.wsService.obsConnection(environment.obs_port,environment.obs_password);
      this.wsService.wsFunctionCall() 
      
}

obsWebSocketConnect() {

  if(!this.wsService.broadcast) {
  this.wsService.broadcast = true;
  } else {
    this.wsService.broadcast = false;
  }

  if(this.wsService.broadcast) {

    try {
      this.wsService.obsConnection(environment.obs_port,environment.obs_password);
    }
    catch(err) {
      console.log("OBS Credential not well!");
    }
    
  }
  // this.router.navigate([]).then(result => {  window.open('/obs-form', '_blank'); });
  
}

ngAfterViewInit() {

}

}
