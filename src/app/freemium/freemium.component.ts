import { Component } from '@angular/core';
import { PpviewService } from 'src/services/ppview.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
// import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-freemium',
  templateUrl: './freemium.component.html',
  styleUrls: ['./freemium.component.css'],
})
export class FreemiumComponent {
  routingState: any;

  constructor(
    private ppview: PpviewService,
    private router: Router,
    private http: HttpClient
  ) {
    this.routingState = this.router.getCurrentNavigation()?.extras?.state;
  }

  bannerData!: any;
  vidSrc!: string;
  mediaBannerURL =
    'https://d29f633ay0x0ow.cloudfront.net/THUMBNAIL/Leadership_1671532858/thumbnail.png';

  ngOnInit() {
    // this.bannerData = [{"id":2,"description":"HashedIn Box Cricket League 2022","mediaUrl":"https://d30m0bkllz0rr4.cloudfront.net/output/e54256cd-bd7e-496d-99ad-d52e8ca966cc/Banner_1671619725.mpd","mediaBannerUrl":"https://d29f633ay0x0ow.cloudfront.net/THUMBNAIL/Leadership_1671532858/thumbnail.png","type":"","price":"","isFreemium":"","mediaName":"Leadership Cricket Match","contentType":{"id":1,"type":"sport","status":true},"banner":true,"bannerUrl":"https://d29f633ay0x0ow.cloudfront.net/THUMBNAIL/Leadership_1671532858/banner.png","rated":{"id":1,"type":"adult","status":true},"status":true,"createdOn":"2022-12-20","contentName":"Leadership_1671532858","contentStatus":"UPLOAD_PENDING","event":null,"live":false,"director":"Komal","genreIds":[4,5]},{"id":1,"description":"HashedIn Box Cricket League 2022","mediaUrl":"https://d2w185d3abcqry.cloudfront.net/highlights670304_50.mp4","subtitles":"","mediaBannerUrl":"https://d29f633ay0x0ow.cloudfront.net/THUMBNAIL/Final_16715329791/thumbnail.png","mediaName":"Final: Product Panthers Vs Data Daredevils","type":"","price":"","isFreemium":"","contentType":{"id":1,"type":"sport","status":true},"banner":true,"mediaBannerUrls":"https://d29f633ay0x0ow.cloudfront.net/THUMBNAIL/Final:_16715329791/banner.png","rated":{"id":1,"type":"adult","status":true},"status":true,"createdOn":"2022-12-20","contentName":"Final_16715329791","contentStatus":"UPLOAD_PENDING","event":null,"live":false,"director":"Komal","genreIds":[1,3,4]}]
    // this.bannerData =
    this.initFreemiumContent();
  }

  initFreemiumContent() {
    this.ppview
      .getContents('freemium')
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
  //   this.router.navigate(['/vid-play'], {
  //     state: {
  //       selVideo: vidElement,
  //     },
  //   });
  // }
  setVideoUrl(vidElement: any) {
    console.log('URL ', vidElement);

    const apiUrl = 'http://localhost:8082/isEligible';
    const queryParams = { userId: '1', videoId: vidElement.videoId }; // Assuming you have a video ID to send

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
}
