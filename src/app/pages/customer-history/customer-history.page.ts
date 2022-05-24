import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cities, Customer } from 'src/app/shared/common';
import { CustomerHistoryService } from './customer-history.service';

@Component({
  selector: 'app-customer-history',
  templateUrl: './customer-history.page.html',
  styleUrls: ['./customer-history.page.scss'],
})
export class CustomerHistoryPage implements OnInit {
  cities: Cities[] = [];
  routes: { routename: string }[] = [];
  customers: Customer[] = [];
  Polygan: { lat: number; lng: number }[] = [];
  cust_codes: number[] = [];

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

  // http Requests

  getCities() {
    this.cities = [];
    this.historyService
      .getCities()
      .subscribe((res: Cities[]) => (this.cities = res));
  }

  selectCity(value: any) {
    this.routes = [];
    this.historyService
      .getRoutesByCity(value.detail.value)
      .subscribe((res: { routename: string }[]) => (this.routes = res));
  }

  routeSelect(value: any) {
    this.historyService
      .getCustomersByRoute(value.detail.value)
      .subscribe((customers: Customer[]) => {
        this.customers = customers;
        console.log(customers);

        if (this.customers.length)
          this.customers.forEach((customer) =>
            this.Polygan.push({
              lat: parseFloat(customer.PointLatitude),
              lng: parseFloat(customer.PointLongitude),
            })
          );
        this.initialShopPoint(customers);
      });
  }

  initialShopPoint(customers: Customer[]) {
    customers.forEach((customer) => {
      this.cust_codes.push(parseInt(customer.CustCode, 10));
      let latLng = {
        lat: customer.PointLatitude,
        lng: customer.PointLongitude,
      };
      let contentString = `
      <div style="direction:rtl;overflow: hidden">
        <h1> ${customer.custName} </h1>
        <div> 
          <p>Tel : ${customer.Tel} </p>
          <p>Visitor : ${customer.Visitor} </p>
          <p>Address : ${customer.ADDRESS} </p>
        </div>
      </div>`;

      let marker = {
        position: latLng,
        icon: 'assets/icon/shop1.png',
        // map: this.map,
      };
      // marker.addListener("click", function () {
      //   iw.ShowWindowInfo(marker, contentString);
      // });
      // this.shop_markers.push(marker);
    });
  }
}
