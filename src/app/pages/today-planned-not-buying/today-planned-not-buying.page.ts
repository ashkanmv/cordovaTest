import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-today-planned-not-buying',
  templateUrl: './today-planned-not-buying.page.html',
  styleUrls: ['./today-planned-not-buying.page.scss'],
})
export class TodayPlannedNotBuyingPage implements OnInit {
  // delete later
  IsDetailsShowing = true;
  Is1DetailsShowing = false;
  //
  constructor(private router: Router) {}
  dateNow = new Date();
  ngOnInit() {}
  // delete later
  toggleDtails() {
    this.IsDetailsShowing = !this.IsDetailsShowing;
  }
  toggleDtails1() {
    this.Is1DetailsShowing = !this.Is1DetailsShowing;
  }
  //
}
