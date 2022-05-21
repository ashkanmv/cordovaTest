import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cities } from 'src/app/shared/common';
import { CustomerHistoryService } from './customer-history.service';

@Component({
  selector: 'app-customer-history',
  templateUrl: './customer-history.page.html',
  styleUrls: ['./customer-history.page.scss'],
})
export class CustomerHistoryPage implements OnInit {
  cities: Cities[] = [];
  routes: { routename: string }[] = [];

  IsDetailsShowing = false;
  IsDCDDetailsShowing = false;

  isShowing = false;
  customerInfo: {
    shopName: string;
    shopCode: number;
    shopType: string;
    tell: number;
    sr: string;
    address: string;
  };
  constructor(
    private router: Router,
    private historyService: CustomerHistoryService
  ) {
    this.customerInfo = {
      shopName: 'Jahan Akbary',
      shopCode: 21632297,
      shopType: 'A',
      tell: 98912388,
      sr: 'Saeed Rostamy',
      address: 'Tehran_Zafar',
    };
  }

  ngOnInit() {
    this.getCities();
  }
  backButton() {
    this.router.navigate(['/']);
  }
  toggleDtails() {
    this.IsDetailsShowing = !this.IsDetailsShowing;
    this.isShowing = !this.isShowing;
  }
  toggleDtailsDCD() {
    this.IsDCDDetailsShowing = !this.IsDCDDetailsShowing;
    this.isShowing = !this.isShowing;
  }

  // http Requests

  getCities() {
    this.cities = [];
    this.historyService
      .getCities()
      .subscribe((res: Cities[]) => (this.cities = res));
  }

  selectCity(city: string) {
    this.routes = [];
    this.historyService
      .getRoutesByCity(city)
      .subscribe((res: { routename: string }[]) => (this.routes = res));
  }
}
