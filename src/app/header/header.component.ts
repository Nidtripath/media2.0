import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PpviewService } from 'src/services/ppview.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  routingState: any;

  constructor(private router: Router, private ppviewService: PpviewService) {
    this.routingState = this.router.getCurrentNavigation()?.extras?.state;
  }

  ngOnInit() {
    this.router.events.subscribe((val: any) => {
      console.log(val.urls);
    });
  }

  navigateToLogin() {
    this.ppviewService.logout();
    this.router.navigate(['/login'], {});
  }
}
