import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-online-daily-sales',
  templateUrl: './online-daily-sales.page.html',
  styleUrls: ['./online-daily-sales.page.scss'],
})
export class OnlineDailySalesPage implements OnInit {
  constructor(private router: Router) {}
  segmentChanged(ev: any) {
    console.log('Segment changed', ev);
  }
  ngOnInit() {}
  backButton() {
    this.router.navigate(['/']);
  }
}
