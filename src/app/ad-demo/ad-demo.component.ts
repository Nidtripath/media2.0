import { Component } from '@angular/core';
declare var jwplayer: any;

@Component({
  selector: 'app-ad-demo',
  templateUrl: './ad-demo.component.html',
  styleUrls: ['./ad-demo.component.css']
})
export class AdDemoComponent {

  

  ngOnInit() {
  const player = jwplayer("videoElement");

  player.setup({
    "playlist": "https://cdn.jwplayer.com/libraries/0kJ1cxRW.js",
    "advertising": {
      "client": "vast",
      "adscheduleid": "5ZOWP4Hy",
      "schedule": "myvmap.xml"
    }
  });
}

  // // jwplayer!: any;
  // declare var jwplayer: any;

  // ngOnInit() {
  //   jwplayer("videoElement").setup({
  //     "playlist": "https://cdn.jwplayer.com/v2/media/hWF9vG66",
  //     "autostart": "viewable",
  //     "advertising": {
  //         "client": "vast",
  //         "tag": "http://adserver.com/vastTag.xml"
  //     }
  // }

  
// });

}
