import { Component, OnInit, AfterViewInit } from '@angular/core';

declare var jwplayer: any;

@Component({
  selector: 'app-jwplayer',
  templateUrl: './jwplayer.component.html',
  styleUrls: ['./jwplayer.component.css']
})
export class JwplayerComponent implements OnInit, AfterViewInit {

  constructor() { }

  ngOnInit() {

    // const playerJw = jwplayer('player').setup({
    //   title: 'Player Test',
    //   playlist: 'https://cdn.jwplayer.com/v2/media/8L4m9FJB',
    //   width: 640,
    //   height: 360,
    //   aspectratio: '16:9',
    //   mute: false,
    //   autostart: true,
    //   primary: 'html5',
    // });

   

    

  }

  
  private initializeJWPlayer(): void {
    // Paste the JWPlayer JavaScript code snippet here
    const player = jwplayer("jwplayer-container");
    const player2 = jwplayer("jwplayer-container2");

    
    player2.setup({
      file: 'https://d2w185d3abcqry.cloudfront.net/highlights670304_50.mp4', // Replace with the URL to your video
      // file: 'https://ef4031d42711455794e31cc6e009a739.mediatailor.ap-south-1.amazonaws.com/v1/master/b437ce955a4043c5d5cf6590197100d801da1a06/VKAD/Pregame_1672754698.m3u8',
      primary: 'html5',
      advertising: {
          client: 'vast', // The VAST ad client for JW Player
          schedule: {
              adbreak1: {
                  offset: 'pre', // Play the ad before the video starts
                  tag: 'https://cdn.theoplayer.com/demos/preroll.xml', // Replace with the URL to your VAST ad tag
                  
              }
          }
      },
      autostart: true,
      width: '50%',
      height: '360'
  });


  //   player2.setup({
  //     file: 'https://d2w185d3abcqry.cloudfront.net/highlights670304_50.mp4', // Replace with the URL to your video
  //     // file: 'https://ef4031d42711455794e31cc6e009a739.mediatailor.ap-south-1.amazonaws.com/v1/master/b437ce955a4043c5d5cf6590197100d801da1a06/VKAD/Pregame_1672754698.m3u8',
  //     primary: 'html5',
  //     advertising: {
  //         client: 'vast', // The VAST ad client for JW Player
  //         adscheduleid: "5ZOWP4Hy",
  //         schedule: {
  //             adbreak1: {
  //                 offset: 'pre', // Play the ad before the video starts
  //                 // offset: 'post', // Play the ad before the video starts
  //                 tag: 'https://cdn.theoplayer.com/demos/preroll.xml', // Replace with the URL to your VAST ad tag
  //                 // tag: 'https://cdn.jwplayer.com/players/u7F0z0hT-1XxEKxWy.js', // Replace with the URL to your VAST ad tag
  //             }
  //         }
  //     },
  //     autostart: true,
  //     width: '50%',
  //     height: '360'
  // });


    player.setup({
      // file: 'https://d2w185d3abcqry.cloudfront.net/highlights670304_50.mp4', // Replace with the URL to your video
      file: 'https://4ee6659aac5c4123b735c58588f288a1.mediatailor.ap-south-1.amazonaws.com/v1/master/b437ce955a4043c5d5cf6590197100d801da1a06/testAd1/',
      primary: 'html5',
      advertising: {
          client: 'vast', // The VAST ad client for JW Player
          adscheduleid: "5ZOWP4Hy",
          schedule: {
              adbreak1: {
                  offset: 'post', // Play the ad before the video starts
                  // offset: 'post', // Play the ad before the video starts
                  tag: 'https://cdn.theoplayer.com/demos/preroll.xml', // Replace with the URL to your VAST ad tag
                  // tag: 'https://cdn.jwplayer.com/players/u7F0z0hT-1XxEKxWy.js', // Replace with the URL to your VAST ad tag
              }
          }
      },
      autostart: true,
      width: '50%',
      height: '360'
  });

  //   player.setup({
  //     "playlist": "https://cdn.jwplayer.com/v2/media/8L4m9FJB",
  //     "advertising": {
  //       "client": "vast",
  //       "adscheduleid": "5ZOWP4Hy",
  //       "schedule": "myvmap.xml"
  //     }
  //   });
  }

  ngAfterViewInit(): void {
    const jwScript = document.createElement('script');
    jwScript.src = 'https://cdn.jwplayer.com/libraries/0kJ1cxRW.js';
    jwScript.onload = () => this.initializeJWPlayer();
    document.head.appendChild(jwScript);
  }

  

}




// import { Component } from '@angular/core';
// "schedule": "myvmap.xml"
// @Component({
//   selector: 'app-jwplayer',
//   templateUrl: './jwplayer.component.html',
//   styleUrls: ['./jwplayer.component.css']
// })
// export class JwplayerComponent {

//   jwplayer!: any;

  
//   ngOnInit() {
//     const playerJw = this.jwplayer("player").setup({
//       "playlist": "https://cdn.jwplayer.com/v2/media/hWF9vG66",
//       "autostart": "viewable",
//       "advertising": {
//           "client": "vast",
//           "tag": "http://adserver.com/vastTag.xml"
//       }
//   });

  
// }


//   // ngOnInit() {

//   //   const playerJw = this.jwplayer('player').setup({
//   //     title: 'Player Test',
//   //     playlist: 'https://cdn.jwplayer.com/v2/media/8L4m9FJB',
//   //     width: 640,
//   //     height: 360,
//   //     aspectratio: '16:-9',
//   //     mute: false,
//   //     autostart: true,
//   //     primary: 'html5',
//   //   });

    


//   // }
// }
