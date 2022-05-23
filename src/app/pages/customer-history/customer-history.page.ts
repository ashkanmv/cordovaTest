import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer-history',
  templateUrl: './customer-history.page.html',
  styleUrls: ['./customer-history.page.scss'],
})
export class CustomerHistoryPage implements OnInit {
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
}
