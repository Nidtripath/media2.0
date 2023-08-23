import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
declare const shaka: any;

@Component({
  selector: 'app-play-vid',
  templateUrl: './play-vid.component.html',
  styleUrls: ['./play-vid.component.css'],
})
export class PlayVidComponent {
  @ViewChild('videoElement')
  videoElement!: ElementRef;

  routingState!: any;
  selectedVideo!: any;
  manifestUri!: string;

  constructor(private router: Router) {
    this.routingState = this.router.getCurrentNavigation()?.extras?.state;
  }

  ngOnInit() {
    this.selectedVideo = this.routingState['selVideo'];
    console.log('Selected video ', this.selectedVideo);
    this.manifestUri = this.selectedVideo.mediaUrl;
    this.initApp();
  }

  initApp() {
    // Attach Shaka Player script to the document
    const shakaScript = document.createElement('script');
    shakaScript.src =
      'https://cdnjs.cloudflare.com/ajax/libs/shaka-player/3.1.1/shaka-player.compiled.js';
    shakaScript.onload = () => {
      this.initPlayer();
    };
    document.head.appendChild(shakaScript);
  }
  initPlayer() {
    const video = document.getElementById('video') as HTMLVideoElement;
    const player = new shaka.Player(video);

    player.configure({
      drm: {
        servers: {
          'com.widevine.alpha':
            'https://widevine-dash.ezdrm.com/proxy?pX=5A3E53',
        },
      },
    });

    player.addEventListener('error', this.onErrorEvent);

    // Replace 'manifestUri' with the appropriate URL
    // const manifestUri = 'https://d3psy8fkd67s0n.cloudfront.net/output/hbcl/hbcl.mpd';

    player
      .load(this.manifestUri)
      .then(() => {
        console.log('The video has now been loaded!');
      })
      .catch(this.onError);
  }

  onErrorEvent(event: any) {
    this.onError(event.detail);
  }

  onError(error: any) {
    console.error('Error code', error.code, 'object', error);
  }
}
