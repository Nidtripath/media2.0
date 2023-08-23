import { Component } from '@angular/core';

@Component({
  selector: 'app-ott',
  templateUrl: './ott.component.html',
  styleUrls: ['./ott.component.css']
})
export class OttComponent {

  showDiv: {
    [key: string]: boolean } = {
      home: true,
      rent: false
    }

  toggle(section: string) {
    this.showDiv[section] = !this.showDiv[section];
  }

}
