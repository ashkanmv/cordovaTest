import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-online-daily-sales',
  templateUrl: './online-daily-sales.page.html',
  styleUrls: ['./online-daily-sales.page.scss'],
})
export class OnlineDailySalesPage implements OnInit {
  IsDetailsShowing = true;
  IsDCDDetailsShowing = false;
  selectedSegment: string = 'NON_DSD';
  constructor(private router: Router) {}
  ngOnInit() {}
  backButton() {
    this.router.navigate(['/']);
  }
  segmentChanged(event: any) {
    // console.log(event.target.value);
    this.selectedSegment = event.target.value;
  }
  toggleDtails() {
    this.IsDetailsShowing = !this.IsDetailsShowing;
  }
  toggleDtailsDCD() {
    this.IsDCDDetailsShowing = !this.IsDCDDetailsShowing;
  }
}
