import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

@Component({
  selector: 'app-max-pped',
  templateUrl: './max-pped.page.html',
  styleUrls: ['./max-pped.page.scss'],
})
export class MaxPPEDPage implements OnInit {
  dateNow = new Date();

  nestedTableIsShowingRow_1: boolean = false;
  nestedTableIsShowingRow_2: boolean = false;
  nestedTableIsShowingRow_3: boolean = false;
  nestedTableIsShowingRow_4: boolean = false;
  constructor(private router: Router) {}
  selectedSegment: string = 'per-customer';

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
