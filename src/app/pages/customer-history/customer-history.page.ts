import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer-history',
  templateUrl: './customer-history.page.html',
  styleUrls: ['./customer-history.page.scss'],
})
export class CustomerHistoryPage implements OnInit {
  IsDCD1DetailsShowing = false;
  IsDCD2DetailsShowing = false;
  IsDCD3DetailsShowing = false;
  IsDCD4DetailsShowing = false;
  IsDCD5DetailsShowing = false;
  IsDD200DetailsShowing = false;
  IsTotalDetailsShowing = false;
  IsFLanDetailsShowing = false;

  customerInfo: {
    shopName: string;
    shopCode: number;
    shopType: string;
    tell: number;
    sr: string;
    address: string;
  };
  constructor(private router: Router) {
    this.customerInfo = {
      shopName: 'Jahan Akbary',
      shopCode: 21632297,
      shopType: 'A',
      tell: 98912388,
      sr: 'Saeed Rostamy',
      address: 'Tehran_Zafar',
    };
  }

  ngOnInit() {}
  // cancel() {
  //   this.datePicker.cancel();
  // }

  // done() {
  //   this.datePicker.confirm();
  // }
  backButton() {
    this.router.navigate(['/']);
  }
  toggleDtailsDD200() {
    this.IsDD200DetailsShowing = !this.IsDD200DetailsShowing;
  }
  toggleDtailsFLan() {
    this.IsFLanDetailsShowing = !this.IsFLanDetailsShowing;
  }
  toggleDtailsTotal() {
    this.IsTotalDetailsShowing = !this.IsTotalDetailsShowing;
  }
  toggleDtailsDCD1() {
    this.IsDCD1DetailsShowing = !this.IsDCD1DetailsShowing;
  }
  toggleDtailsDCD2() {
    this.IsDCD2DetailsShowing = !this.IsDCD2DetailsShowing;
  }
  toggleDtailsDCD3() {
    this.IsDCD3DetailsShowing = !this.IsDCD3DetailsShowing;
  }
  toggleDtailsDCD4() {
    this.IsDCD4DetailsShowing = !this.IsDCD4DetailsShowing;
  }
  toggleDtailsDCD5() {
    this.IsDCD5DetailsShowing = !this.IsDCD5DetailsShowing;
  }
}
