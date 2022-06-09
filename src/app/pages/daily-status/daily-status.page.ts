import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-daily-status',
  templateUrl: './daily-status.page.html',
  styleUrls: ['./daily-status.page.scss'],
})
export class DailyStatusPage implements OnInit {
  IsDetailsShowing = true;
  IsDCDDetailsShowing = false;
  selectedSegment: string = 'tablet';
  constructor(private router: Router) {}
  segmentChanged(event: any) {
    // console.log(event.target.value);
    this.selectedSegment = event.target.value;
  }

  ngOnInit() {}
}
