import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

@Component({
  selector: 'app-max-pped',
  templateUrl: './max-pped.page.html',
  styleUrls: ['./max-pped.page.scss'],
})
export class MaxPPEDPage implements OnInit {
  dateNow = new Date();
  selectedSegment: string = 'per-customer';

  nestedTableIsShowingRow_1: boolean = false;
  nestedTableIsShowingRow_2: boolean = false;
  nestedTableIsShowingRow_3: boolean = false;
  nestedTableIsShowingRow_4: boolean = false;
  constructor(private router: Router) {}

  public routeData: Array<any> = [
    {
      route: 1131,
      city: 'Tehran',
      visitorName: 'Behnam Ezadi',
      sale: 3.12,
      PPED: 19,
      percentage: 782,
    },
    {
      route: 1132,
      city: 'Tabriz',
      visitorName: 'Behnaz Azadi',
      sale: 4.12,
      PPED: 9,
      percentage: 7.82,
    },
    {
      route: 1133,
      city: 'Esfahan',
      visitorName: 'Behzad Azari',
      sale: 3.12,
      PPED: 19,
      percentage: 782,
    },
    {
      route: 1134,
      city: 'Amol',
      visitorName: 'Behrooz Ezraee',
      sale: 3.12,
      PPED: 19,
      percentage: 782,
    },
  ];

  ngOnInit() {}
  backButton() {
    this.router.navigate(['/']);
  }
  segmentChanged(event: any) {
    // console.log(event.target.value);
    this.selectedSegment = event.target.value;
  }
  toggleNestedTabelRow_1() {
    this.nestedTableIsShowingRow_1 = !this.nestedTableIsShowingRow_1;
  }
  toggleNestedTabelRow_2() {
    this.nestedTableIsShowingRow_2 = !this.nestedTableIsShowingRow_2;
  }
  toggleNestedTabelRow_3() {
    this.nestedTableIsShowingRow_3 = !this.nestedTableIsShowingRow_3;
  }
  toggleNestedTabelRow_4() {
    this.nestedTableIsShowingRow_4 = !this.nestedTableIsShowingRow_4;
  }
}
