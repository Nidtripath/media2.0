import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { PpviewService } from 'src/services/ppview.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
// import * as shaka from 'shaka-player';
// import shaka from 'shaka-player/dist/shaka-player.ui';
// import { shaka } from "../../assets/js/shaka-player-4.3.8/ui/ui.js";
declare const shaka: any;

@Component({
  selector: 'app-rent',
  templateUrl: './rent.component.html',
  styleUrls: ['./rent.component.css'],
})
export class RentComponent implements OnInit {
  @ViewChild('videoElement', { static: true }) videoElementRef!: ElementRef;

  manifestUri =
    'https://d30m0bkllz0rr4.cloudfront.net/output/e54256cd-bd7e-496d-99ad-d52e8ca966cc/Banner_1671619725.mpd';

  @ViewChild('videoElement')
  videoElement!: ElementRef;
  vidSrc!: string;
  bannerData!: any;
  paymentSuccessful!: boolean;

  constructor(
    private ppview: PpviewService,
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient
  ) {}

  mediaBannerURL =
    'https://d29f633ay0x0ow.cloudfront.net/THUMBNAIL/Leadership_1671532858/thumbnail.png';

  ngOnInit(): void {
    // this.bannerData = [{"id":2,"description":"HashedIn Box Cricket League 2022","mediaUrl":"https://d2w185d3abcqry.cloudfront.net/highlights670304_50.mp4","mediaBannerUrl":"https://d29f633ay0x0ow.cloudfront.net/THUMBNAIL/Leadership_1671532858/thumbnail.png","type":"","price":"","isFreemium":"","mediaName":"Leadership Cricket Match","contentType":{"id":1,"type":"sport","status":true},"banner":true,"bannerUrl":"https://d29f633ay0x0ow.cloudfront.net/THUMBNAIL/Leadership_1671532858/banner.png","rated":{"id":1,"type":"adult","status":true},"status":true,"createdOn":"2022-12-20","contentName":"Leadership_1671532858","contentStatus":"UPLOAD_PENDING","event":null,"live":false,"director":"Komal","genreIds":[4,5]},{"id":1,"description":"HashedIn Box Cricket League 2022","mediaUrl":"https://d2w185d3abcqry.cloudfront.net/highlights670304_50.mp4","subtitles":"","mediaBannerUrl":"https://d29f633ay0x0ow.cloudfront.net/THUMBNAIL/Final_16715329791/thumbnail.png","mediaName":"Final: Product Panthers Vs Data Daredevils","type":"","price":"","isFreemium":"","contentType":{"id":1,"type":"sport","status":true},"banner":true,"mediaBannerUrls":"https://d29f633ay0x0ow.cloudfront.net/THUMBNAIL/Final:_16715329791/banner.png","rated":{"id":1,"type":"adult","status":true},"status":true,"createdOn":"2022-12-20","contentName":"Final_16715329791","contentStatus":"UPLOAD_PENDING","event":null,"live":false,"director":"Komal","genreIds":[1,3,4]}]
    // console.log(this.bannerData);
    // this.initApp();
    this.initRentalContent();
    const navigationState = history.state;
    if (navigationState) {
      this.paymentSuccessful = navigationState.paymentSuccessful;
    }
    console.log('response from pay com', this.paymentSuccessful);
  }

  initRentalContent() {
    this.ppview
      .getContents('rent')
      .pipe()
      .subscribe((data: any) => {
        this.bannerData = data;
      });
  }

  playVideo(video: any) {
    this.vidSrc = video.sources;
  }

  // setVideoUrl(vidElement: any) {
  //   console.log('URL ', vidElement);
  //   this.ppview.selVideo = vidElement;
  //   if (this.paymentSuccessful) {
  //     this.router.navigate(['/vid-play'], {
  //       state: {
  //         selVideo: vidElement,
  //       },
  //     });
  //   } else {
  //     this.router.navigate(['/show-detail'], {
  //       state: {
  //         selVideo: vidElement,
  //       },
  //     });
  //   }
  // }

  setVideoUrl(vidElement: any) {
    console.log('URL ', vidElement);

    const apiUrl = 'http://localhost:8082/isEligible';
    const queryParams = { userId: '28', videoId: vidElement.videoId }; // Assuming you have a video ID to send

    this.http.get(apiUrl, { params: queryParams }).subscribe(
      (response: any) => {
        console.log('Show the is eleigible value', response);
        if (!response) {
          // Video needs to be rented
          this.router.navigate(['/show-detail'], {
            state: {
              selVideo: vidElement,
            },
          });
        } else {
          // Video is eligible for direct play
          this.router.navigate(['/vid-play'], {
            state: {
              selVideo: vidElement,
            },
          });
        }
      },
      (error) => {
        console.error('API Error:', error);
        // Handle error if needed
      }
    );
  }

  //   initApp() {
  //     // Attach Shaka Player script to the document
  //     const shakaScript = document.createElement('script');
  //     shakaScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/shaka-player/3.1.1/shaka-player.compiled.js';
  //     shakaScript.onload = () => {
  //       this.initPlayer();
  //     };
  //     document.head.appendChild(shakaScript);
  //   }
  //   initPlayer() {
  //     const video = document.getElementById('video') as HTMLVideoElement;
  //     const player = new shaka.Player(video);

  //     player.configure({
  //       drm: {
  //         servers: {
  //           'com.widevine.alpha': 'https://widevine-dash.ezdrm.com/proxy?pX=5A3E53',
  //         }
  //       }
  //     });

  //     player.addEventListener('error', this.onErrorEvent);

  //     // Replace 'manifestUri' with the appropriate URL
  //     const manifestUri = 'https://d3psy8fkd67s0n.cloudfront.net/output/hbcl/hbcl.mpd';

  //     player.load(manifestUri).then(() => {
  //       console.log('The video has now been loaded!');
  //     }).catch(this.onError);
  //   }

  //   onErrorEvent(event: any) {
  //     this.onError(event.detail);
  //   }

  //   onError(error: any) {
  //     console.error('Error code', error.code, 'object', error);
  //   }
  // }
}
