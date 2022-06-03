import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-gps-tracking',
  templateUrl: './gps-tracking.page.html',
  styleUrls: ['./gps-tracking.page.scss'],
})
export class GpsTrackingPage implements OnInit {
  Date: string = 'Date';
  popoverController: any;
  constructor(private router: Router) {}

  ngOnInit() {}
  backButton() {
    this.router.navigate(['/']);
  }
}
