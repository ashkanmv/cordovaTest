import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sales-hourly-day',
  templateUrl: './sales-hourly-day.page.html',
  styleUrls: ['./sales-hourly-day.page.scss'],
})
export class SalesHourlyDayPage implements OnInit {
  selectedSegment: string = 'dsd-hourly-city';

  constructor(private router: Router) {}
  public salesHourlyCity: Array<any> = [
    {
      city: 'Esfahan',
      H8: 29.4,
      H9: 284,
      H10: 4747,
      H11: 4564,
      H12: 435345,
      H13: 57558,
      H14: 55453,
      H15: 76544,
      H16: 456,
      H17: 665,
      total: 44459,
    },
    {
      city: 'Amol',
      H8: 26.4,
      H9: 284,
      H10: 4747,
      H11: 4564,
      H12: 435345,
      H13: 57558,
      H14: 55453,
      H15: 76544,
      H16: 456,
      H17: 665,
      total: 45649,
    },
    {
      city: 'karaj',
      H8: 27.4,
      H9: 284,
      H10: 4747,
      H11: 4564,
      H12: 435345,
      H13: 57558,
      H14: 55453,
      H15: 76544,
      H16: 456,
      H17: 665,
      total: 456459,
    },
    {
      city: 'Tehran',
      H8: 249.4,
      H9: 284,
      H10: 4747,
      H11: 4564,
      H12: 435345,
      H13: 57558,
      H14: 55453,
      H15: 76544,
      H16: 456,
      H17: 665,
      total: 45459,
    },
  ];

  ngOnInit() {}
  segmentChanged(event: any) {
    // console.log(event.target.value);
    this.selectedSegment = event.target.value;
  }
}
