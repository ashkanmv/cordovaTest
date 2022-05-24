import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-score-card',
  templateUrl: './score-card.page.html',
  styleUrls: ['./score-card.page.scss'],
})
export class ScoreCardPage implements OnInit {
  IsDetailsShowing = false;
  IsDCDDetailsShowing = false;
  selectedSegment: string = 'category';

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
