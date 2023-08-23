import { Component } from '@angular/core';
import { WebsocketService } from '../../services/websocket/websocket.service';
// import { MatDialog } from '@angular/material/dialog';
import { Router,ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-obs-form',
  templateUrl: './obs-form.component.html',
  styleUrls: ['./obs-form.component.css']
})

export class ObsFormComponent {


  constructor(public wsService: WebsocketService, private router: ActivatedRoute) {


  }

  // obsUrl: string;


  obsConnect() {
  var obsURL = (<HTMLInputElement>document.getElementById("port")).value;
  var password = (<HTMLInputElement>document.getElementById("obs-password")).value;
  
  this.wsService.obsConnection(obsURL, password);  
  
  }

  func() {
    var entry = (<HTMLInputElement>document.getElementById("entry")).value;
    if(entry == 'y') {
      this.wsService.triggerReplay();
    }
  }

  openCloseTab = () => {
    window.close();       // Now, close the tab.
}
}
