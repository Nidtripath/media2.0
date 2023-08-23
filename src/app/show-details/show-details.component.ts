import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { PpviewService } from 'src/services/ppview.service';

@Component({
  selector: 'app-show-details',
  templateUrl: './show-details.component.html',
  styleUrls: ['./show-details.component.css'],
})
export class ShowDetailsComponent {
  routingState!: any;
  selectedVideo!: any;
  mediaBannerURL =
    'https://d29f633ay0x0ow.cloudfront.net/THUMBNAIL/Leadership_1671532858/thumbnail.png';

  constructor(private router: Router, private ppview: PpviewService) {
    this.routingState = this.router.getCurrentNavigation()?.extras?.state;
  }

  ngOnInit() {
    this.selectedVideo = this.routingState['selVideo'];
    console.log('Selected video ', this.selectedVideo);
  }

  rentTheVideo() {
    this.ppview.selVideo = this.selectedVideo;
    this.router.navigate(['/payment'], {
      state: {
        selVideo: this.selectedVideo,
      },
    });
  }
}
