import { Component } from '@angular/core';
import { BallLog } from '../modal/ball-log.model'
import { WsresponseService } from '../../services/wsresponse.service';
import { WebsocketService } from '../../services/websocket/websocket.service';
// import { ballData } from '../../services/websocket/websocket.service';

@Component({
  selector: 'app-tticker',
  templateUrl: './tticker.component.html',
  styleUrls: ['./tticker.component.css']
})
export class TtickerComponent{

  constructor(private wsRespnse: WsresponseService, public wsService: WebsocketService) {
  }

  ballLogs: Array<BallLog> = [];
  firstTeamName!: string;
  secondTeamName!: string;
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

  id:any={
    match_id: 558475
  }


  ngOnInit() {
    console.log("BallLogs from ws ",this.wsService.ballData);
  }

  ngAfterViewInit() {    
  }
  
}
