import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Data, Params, Router } from '@angular/router';
import { LoadingController, Platform } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Cities, Customer, Marker } from 'src/app/shared/common';
import { SharedService } from 'src/app/shared/shared.service';
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
  markers: Marker[] = [];
  cust_codes: number[] = [];
  form: FormGroup;
  paramSubscription: Subscription;
  typeSubscription: Subscription;
  kgqtySubscription: Subscription;

  //ToDo
  public get Customer_Number(): string {
    return
  }


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
    private customerHistoryService: CustomerHistoryService,
    private plt: Platform,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private loadingCtrl: LoadingController,
    private sharedService: SharedService
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
    // this.getToday();
    if (this.Customer_Number) this.Get_CustomerFromMap(this.Customer_Number);
    else this.getCities();
    this.loadForm();
    this.getAvgs();
  }

  ionViewDidEnter() {
    this.plt.ready().then(() => {
      this.paramSubscription = this.activatedRoute.queryParams.subscribe((params: Params) =>
        this.form.patchValue({ Customer: params['Customer'] }))
    });
  }

  ionViewDidLeave() {
    this.paramSubscription.unsubscribe();
    this.kgqtySubscription.unsubscribe();
    this.typeSubscription.unsubscribe();
  }

  backButton() {
    this.router.navigate(['/']);
  }

  loadForm() {
    this.form = this.formBuilder.group({
      'DC': [null],
      'Route': [null],
      'Customer': [null],
      'type': ['sales'],
      'kgqty': ['qty']
    });
    this.typeSubscription = this.form.controls['type'].valueChanges.subscribe(v => this.typeChanged(v));
    this.kgqtySubscription = this.form.controls['kgqty'].valueChanges.subscribe(v => this.kgqtyChanged(v));
  }

  get f() { return this.form.controls }

  // http Requests
  async Get_CustomerFromMap(Customer_Number: string) {
    const loading = await this.loadingCtrl.create({
      message: 'Please wait...'
    });
    await loading.present();
    this.customerHistoryService.getCustomersByNumber(Customer_Number).subscribe((customers: Customer[]) => {
      this.customers = customers;
      if (!customers.length)
        return

      this.patchValue('Customer', customers[0].CustCode);
      this.patchValue('Route', customers[0].routename);
      console.log(customers);
      loading.dismiss();
      this.getAvgs();
    }, () => {
      this.sharedService.toast('danger', 'Could not fetch cities ...');
      loading.dismiss();
    })
  }

  async getAvgs() {
    const loading = await this.loadingCtrl.create({
      message: 'Please wait...'
    });
    await loading.present();
    this.customerHistoryService.getAvgs().subscribe(
      (avgs: any[]) => {
        console.log(avgs);

        // for (var i = 0; i < avgs.length; i++) {
        //   if (avgs[i].Class == this.customer_info.CustTYPE) {
        //     this.avg = avgs[i].avg;
        //     if (this.kgqty == "qty") {
        //       this.qtySelect();
        //     } else {
        //       this.kgSelect();
        //     }
        //   }

        // }
        loading.dismiss();
      }, () => {
        this.sharedService.toast('danger', 'Could not fetch Avgs ...');
        loading.dismiss();
      });
  }

  async getCities() {
    this.cities = [];
    const loading = await this.loadingCtrl.create({
      message: 'Please wait...'
    });
    await loading.present();
    this.customerHistoryService
      .getCities()
      .subscribe((res: Cities[]) => {
        this.cities = res
        loading.dismiss();
      }, () => {
        this.sharedService.toast('danger', 'Could not fetch cities ...');
        loading.dismiss();
      });
  }

  async getToday() {
    this.customerHistoryService.getToday().subscribe(val => console.log(val))
  }

  async selectCity(value: any) {
    this.routes = [];
    const loading = await this.loadingCtrl.create({
      message: 'Please wait...'
    });
    await loading.present();
    this.customerHistoryService
      .getRoutesByCity(value.detail.value)
      .subscribe((res: { routename: string }[]) => {
        this.routes = res;
        loading.dismiss();
      }, () => {
        this.sharedService.toast('danger', 'Could not fetch routes ...');
        loading.dismiss();
      });
  }

  routeSelect(value: any) {
    this.customerHistoryService
      .getCustomersByRoute(value.detail.value)
      .subscribe((customers: Customer[]) => {
        this.customers = customers;
        this.markers = [];
        var m: any = [];
        if (this.customers.length)
          this.customers.forEach((customer) => {
            m.push({
              latitude: parseFloat(customer.PointLatitude),
              longitude: parseFloat(customer.PointLongitude),
            });
          });
        this.markers = m;
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

  typeChanged(value: string) {

  }

  kgqtyChanged(value: string) {

  }

  patchValue(controller: string, value: any) {
    this.form.patchValue({ [controller]: value })
  }
}
