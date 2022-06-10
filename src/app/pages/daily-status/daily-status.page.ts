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
  // mock data
  public dailyStatusData: Array<any> = [
    {
      Name: 'Azar Panahi',
      route: 1100,
      in: 4,
      out: 4,
      first: 6,
      last: 43,
      vol: 43,
      pl: 43,
      PlInv: 0,
      OOr: 0,
    },
    {
      Name: 'Panah Azar',
      route: 1103,
      in: 7,
      out: 7,
      first: 0,
      last: 3,
      vol: 3,
      pl: 3,
      PlInv: 3,
      OOr: 3,
    },
    {
      Name: 'Azarmehr Punahi',
      route: 1104,
      in: 3,
      out: 3,
      first: 2,
      last: 4,
      vol: 4,
      pl: 4,
      PlInv: 2,
      OOr: 2,
    },
    {
      Name: 'Pinar Azharmehr',
      route: 1105,
      in: 1,
      out: 1,
      first: 8,
      last: 35,
      vol: 35,
      pl: 35,
      PlInv: 31,
      OOr: 31,
    },
    {
      Name: 'Azar Panahi',
      route: 1100,
      in: 4,
      out: 4,
      first: 6,
      last: 43,
      vol: 43,
      pl: 43,
      PlInv: 0,
      OOr: 0,
    },
    {
      Name: 'Panah Azar',
      route: 1103,
      in: 7,
      out: 7,
      first: 0,
      last: 3,
      vol: 3,
      pl: 3,
      PlInv: 3,
      OOr: 3,
    },
    {
      Name: 'Azarmehr Punahi',
      route: 1104,
      in: 3,
      out: 3,
      first: 2,
      last: 4,
      vol: 4,
      pl: 4,
      PlInv: 2,
      OOr: 2,
    },
    {
      Name: 'Pinar Azharmehr',
      route: 1105,
      in: 1,
      out: 1,
      first: 8,
      last: 35,
      vol: 35,
      pl: 35,
      PlInv: 31,
      OOr: 31,
    },
  ];
  //

  constructor() {}
  segmentChanged(event: any) {
    // console.log(event.target.value);
    this.selectedSegment = event.target.value;
  }

  ngOnInit() {}
}
