import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-today-planned-not-buying',
  templateUrl: './today-planned-not-buying.page.html',
  styleUrls: ['./today-planned-not-buying.page.scss'],
})
export class TodayPlannedNotBuyingPage implements OnInit {
  constructor(private router: Router) {}
  dateNow = new Date();
  ngOnInit() {}
  backButton() {
    this.router.navigate(['/']);
  }
}
