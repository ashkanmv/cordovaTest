import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-today-planned-not-buying',
  templateUrl: './today-planned-not-buying.page.html',
  styleUrls: ['./today-planned-not-buying.page.scss'],
})
export class TodayPlannedNotBuyingPage implements OnInit {
  // mock data
  public routeVisitorData: Array<any> = [
    {
      Route: 1100,
      Visitor: 'Ali Mohammad',
      count: 6,
    },
    {
      Route: 1103,
      Visitor: 'Mohammad Ali',
      count: 0,
    },
    {
      Route: 1104,
      Visitor: 'Mohammad Mohamadian',
      count: 2,
    },
    {
      Route: 1105,
      Visitor: 'Ali Alian',
      count: 8,
    },
  ];
  // --detail
  public routeVisitorDetailData: Array<any> = [
    {
      Name: ' Lola Jahan',
      Number: 205645654,
      Address: 'Tehran_Zafar ',
    },
    {
      Name: 'Jahan Zafaru',
      Number: 657546456,
      Address: 'Tehran_Zafar',
    },
    {
      Name: 'Jahanan Esfahani',
      Number: 46784784,
      Address: 'Tehran_Zafar',
    },
    {
      Name: 'Hanie Jahanian',
      Number: 85674867845,
      Address: 'Tehran_Zafar',
    },
  ];
  //
  // delete later
  IsDetailsShowing = true;
  Is1DetailsShowing = false;
  //
  constructor() {}
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
