import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Data, Params, Router } from '@angular/router';
import { LoadingController, Platform } from '@ionic/angular';
import { Observable, Subject, Subscription } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Cities, Customer, Language, Marker } from 'src/app/shared/common';
import { GeoLocationService } from 'src/app/shared/geo-location.service';
import { LanguageService } from 'src/app/shared/language.service';
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
  selected_ch = [];
  gps = false;
  // show content
  show = true;

  // Search
  searching: boolean;
  items: Observable<any[]>;
  input = new Subject<string | null>();
  value: any;

  public get language(): Language {
    return this.languageService.language;
  }

  //ToDo
  public get Customer_Number(): string {
    return;
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
    private sharedService: SharedService,
    private languageService: LanguageService,
    private geoLocationService: GeoLocationService
  ) {
    this.input.subscribe((term) => {
      if (!term) return;
      this.searching = true;
      this.items = this.customerHistoryService.getCustomerSearch(term)?.pipe(
        map((_) => _),
        tap(() => (this.searching = false))
      );
    });
  }

  ngOnInit() {
    if (this.Customer_Number) this.Get_CustomerFromMap(this.Customer_Number);
    else this.getCities();
    this.loadForm();
  }

  ionViewDidEnter() {
    this.plt.ready().then(() => {
      this.paramSubscription = this.activatedRoute.queryParams.subscribe(
        (params: Params) =>
          this.form.patchValue({ Customer: params['Customer'] })
      );
    });
  }

  ionViewDidLeave() {
    this.paramSubscription.unsubscribe();
    this.kgqtySubscription.unsubscribe();
    this.typeSubscription.unsubscribe();
  }

  loadForm() {
    this.form = this.formBuilder.group({
      DC: [null],
      Route: [null],
      Customer: [null],
      type: ['sales'],
      kgqty: ['qty'],
    });

    this.typeSubscription = this.form.controls.type.valueChanges.subscribe(
      (type: string) => this.typeAndQtyKgSelect()
    );
    this.kgqtySubscription = this.form.controls.kgqty.valueChanges.subscribe(
      (type: string) => this.typeAndQtyKgSelect()
    );
  }

  get f() {
    return this.form.controls;
  }

  async Get_CustomerFromMap(Customer_Number: string) {
    const loading = await this.loadingCtrl.create({
      message: 'Please wait...',
    });
    await loading.present();
    this.customerHistoryService.getCustomersByNumber(Customer_Number).subscribe(
      (customers: Customer[]) => {
        this.customers = customers;
        if (!customers.length) return;
        this.patchValue('Customer', customers[0].CustCode);
        this.patchValue('Route', customers[0].routename);
        loading.dismiss();
        this.getAvgs();
      },
      () => {
        this.sharedService.toast('danger', 'Could not fetch cities ...');
        loading.dismiss();
      }
    );
  }

  async getAvgs() {
    const loading = await this.loadingCtrl.create({
      message: 'Please wait...',
    });
    await loading.present();
    this.customerHistoryService.getAvgs().subscribe(
      (avgs: any[]) => {
        this.typeAndQtyKgSelect();
        loading.dismiss();
      },
      () => {
        this.sharedService.toast('danger', 'Could not fetch Avgs ...');
        loading.dismiss();
      }
    );
  }

  async getCities() {
    this.cities = [];
    const loading = await this.loadingCtrl.create({
      message: 'Please wait...',
    });
    await loading.present();
    this.customerHistoryService.getCities().subscribe(
      (res: Cities[]) => {
        this.cities = res;
        loading.dismiss();
      },
      () => {
        this.sharedService.toast('danger', 'Could not fetch cities ...');
        loading.dismiss();
      }
    );
  }

  async getToday() {
    this.customerHistoryService.getToday().subscribe((val) => console.log(val));
  }

  async selectCity(value: any) {
    this.routes = [];
    const loading = await this.loadingCtrl.create({
      message: 'Please wait...',
    });
    await loading.present();
    this.customerHistoryService.getRoutesByCity(value.detail.value).subscribe(
      (res: { routename: string }[]) => {
        this.routes = res;
        loading.dismiss();
      },
      () => {
        this.sharedService.toast('danger', 'Could not fetch routes ...');
        loading.dismiss();
      }
    );
  }

  async routeSelect(value: any) {
    const loading = await this.loadingCtrl.create({
      message: 'Please wait...',
    });
    await loading.present();
    this.customerHistoryService
      .getCustomersByRoute(value.detail.value)
      .subscribe(
        (customers: Customer[]) => {
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
          loading.dismiss();
        },
        () => loading.dismiss()
      );
  }

  customerSelect(value: any) {
    let customer: Customer = value.detail.value;
    this.customerInfo = {
      address: customer.ADDRESS,
      shopCode: +customer.CustCode,
      shopName: customer.custName,
      shopType: customer.CustTYPE,
      sr: customer.Visitor,
      tell: +customer.Tel,
    };
    this.getAvgs();
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

  typeAndQtyKgSelect() {
    switch (this.f.type.value) {
      case 'pped':
        this.handlePped();
        break;

      case 'sales':
        this.handleSales();
        break;

      case 'samples':
        this.handleSamples();
        break;
    }
  }

  handlePped() {
    if (this.f.kgqty.value == 'qty')
      this.customerHistoryService
        .getPpedByCustomer(this.f.Customer.value.CustCode)
        .subscribe((customerHistory: any) => {
          this.createTotalModel(customerHistory);
          this.createChart(customerHistory);
        });
    else
      this.customerHistoryService
        .getkgPpedByCustomer(this.f.Customer.value.CustCode)
        .subscribe((customerHistory: any) => {
          this.createTotalModel(customerHistory);
          this.createChart(customerHistory);
        });
  }

  handleSales() {
    if (this.f.kgqty.value == 'qty')
      this.customerHistoryService
        .getSalesByCustomer(this.f.Customer.value.CustCode)
        .subscribe((customerHistory: any) => {
          this.createTotalModel(customerHistory);
          this.createChart(customerHistory);
        });
    else
      this.customerHistoryService
        .getkgSalesByCustomer(this.f.Customer.value.CustCode)
        .subscribe((customerHistory: any) => {
          this.createTotalModel(customerHistory);
          this.createChart(customerHistory);
        });
  }

  handleSamples() {
    if (this.f.kgqty.value == 'qty')
      this.customerHistoryService
        .getSamplesByCustomer(this.f.Customer.value.CustCode)
        .subscribe((customerHistory: any) => {
          this.createTotalModel(customerHistory);
          this.createChart(customerHistory);
        });
    else
      this.customerHistoryService
        .getkgSamplesByCustomer(this.f.Customer.value.CustCode)
        .subscribe((customerHistory: any) => {
          this.createTotalModel(customerHistory);
          this.createChart(customerHistory);
        });
  }

  customer_histories: any[] = [];
  virtual_rows: any[] = [];
  createTotalModel(customerHistory: any[]) {
    this.customer_histories = [];
    this.virtual_rows = [];
    if (!customerHistory.length) {
      this.sharedService.toast('warning', 'NO Value'); // JSON
      return;
    }
    let index = 1;
    let keys = Object.keys(customerHistory[0]);
    let v_row = {
      type: 'h',
      show: true,
      index: 0,
      color: '#4682B4',
    };
    this.customer_histories.push(keys);
    this.virtual_rows.push(v_row);
    for (var i = 0; i < customerHistory.length; i++) {
      let ch = customerHistory[i];
      let temp = Object.keys(ch).map((key) => ch[key]);
      if (this.form.value.kgqty == 'kg') {
        for (let c = 1; c < temp.length; c++) {
          temp[c] != null || temp[c] != undefined
            ? (temp[c] = parseFloat(temp[c]).toFixed(2))
            : (temp[c] = '');
        }
      }
      this.customer_histories.push(temp);
      let v_row1 = {
        type: 'a',
        show: true,
        index: index,
        color: 'blue',
      };
      index++;
      this.customer_histories.push(temp);
      this.virtual_rows.push(v_row1);
      let v_row2 = {
        type: 'b',
        show: false,
        index: index,
        color: 'white',
      };
      index++;
      this.virtual_rows.push(v_row2);
    }
  }

  async rowClick(row: any) {
    if (row.type == 'a') {
      if (this.virtual_rows[row.index + 1].show) {
        this.virtual_rows[row.index + 1].show = false;
        return;
      } else {
        this.virtual_rows[row.index + 1].show = true;
      }
      const loading = await this.loadingCtrl.create({
        message: 'loading Details ...', // JSON
      });
      loading.present();
      this.handleCustomerCategory(
        this.customer_histories[row.index][0],
        row.index
      );
    }
  }

  handleCustomerCategory(category: string, index: number) {
    switch (this.f.type.value) {
      case 'pped':
        this.handlePpedCategory(category, index);
        break;

      case 'sales':
        this.handleSalesCategory(category, index);
        break;

      case 'samples':
        this.handleSamplesCategory(category, index);
        break;
    }
  }

  handlePpedCategory(category: string, index: number) {
    if (this.f.kgqty.value == 'qty')
      this.customerHistoryService
        .getPpedByCustomerCategory(this.f.Customer.value.CustCode, category)
        .subscribe((data) => {
          this.createModel(data, index + 1);
        });
    else
      this.customerHistoryService
        .getkgPpedByCustomerCategory(this.f.Customer.value.CustCode, category)
        .subscribe((data) => {
          this.createModel(data, index + 1);
        });
  }

  handleSalesCategory(category: string, index: number) {
    if (this.f.kgqty.value == 'qty')
      this.customerHistoryService
        .getSalesByCustomerCategory(this.f.Customer.value.CustCode, category)
        .subscribe((data) => {
          console.log(data);
          this.createModel(data, index + 1);
        });
    else
      this.customerHistoryService
        .getkgSalesByCustomerCategory(this.f.Customer.value.CustCode, category)
        .subscribe((data) => {
          console.log(data);
          this.createModel(data, index + 1);
        });
  }

  handleSamplesCategory(category: string, index: number) {
    if (this.f.kgqty.value == 'qty')
      this.customerHistoryService
        .getSamplesByCustomerCategory(this.f.Customer.value.CustCode, category)
        .subscribe((data) => {
          console.log(data);
          this.createModel(data, index + 1);
        });
    else
      this.customerHistoryService
        .getkgSamplesByCustomerCategory(
          this.f.Customer.value.CustCode,
          category
        )
        .subscribe((data) => {
          console.log(data);
          this.createModel(data, index + 1);
        });
  }

  createModel(model, index) {
    this.selected_ch[index] = [];

    for (var i = 0; i < model.length; i++) {
      let ch = model[i];
      let temp = Object.keys(ch).map((key) => ch[key]);
      if (this.f.kgqty.value == 'kg') {
        for (var j = 1; j < temp.length; j++) {
          if (temp[j] != null) {
            temp[j] = parseFloat(temp[j]).toFixed(2);
          }
        }
      }
      this.selected_ch[index].push(temp);
      this.loadingCtrl.dismiss();
    }
  }
  columns: any[] = [];
  data: any[] = [];
  pieChartData: any[] = [];
  createChart(model) {
    this.columns = [];
    this.data = [];
    this.pieChartData = [];

    if (!model) return;
    let format_model = [];
    let keys = Object.keys(model[0]);

    format_model.push(keys);
    for (var i = 0; i < model.length; i++) {
      let ch = model[i];
      let temp = Object.keys(ch).map((key) => ch[key]);
      format_model.push(temp);
    }
    // this.ctx = this.canvas.nativeElement;
    let row0 = format_model[0];
    row0.shift();
    let labels = row0;
    let dataset = [];
    let pieChartDataSet = [];
    for (var i = 1; i < format_model.length - 1; i++) {
      let label = format_model[i][0];
      let row = format_model[i];
      row.shift();
      let data = row;
      for (var k = 0; k < data.length; k++) {
        if (data[k] == null) {
          data[k] = 0;
        }
      }
      let obj = {
        name: label,
        // backgroundColor: this.backgroundColor[i - 1],
        data: data
      };
      let pieChartObj = {
        name: label,
        data: data.reduce((a, b) => a + b, 0),
      }
      dataset.push(obj);
      pieChartDataSet.push(pieChartObj);
    }

    let rowl = format_model[format_model.length - 1];
    rowl.shift();
    let rowv = rowl;
    let row_avg = [];
    for (var i = 0; i < rowv.length; i++) {
      if (rowl[i] == null) {
        rowl[i] = 0;
      }
    }
    this.columns = labels;
    this.data = dataset;
    this.pieChartData = pieChartDataSet;
  }

  gpsChanged() {
    console.log(this.gps);
    
    if (this.gps)
      this.findShop(35.747956, 51.441753);
      // this.geoLocationService.getCurrentLocation().then(location => {
      //   this.findShop(location.latitude,location.longitude);
      // })
  }

  async findShop(lat : number,lng : number){
    const loading = await this.loadingCtrl.create({
      message: 'Please wait...',
    });
    loading.present();
    this.customerHistoryService.findShop(lat,lng).subscribe((res : any[])=>{
      if(!res.length){
        this.sharedService.toast('danger', this.language.Customer_History.msg_no_customer)
        return
      }

      this.patchValue('Customer',res[0])
      this.customers = res
      this.customerInfo = {
        address: res[0].ADDRESS,
        shopCode: +res[0].CustCode,
        shopName: res[0].custName,
        shopType: res[0].CustTYPE,
        sr: res[0].Visitor,
        tell: +res[0].Tel,
      }; 
      loading.dismiss()
      this.getAvgs();
    })
  }

  patchValue(controller: string, value: any) {
    this.form.patchValue({ [controller]: value });
  }
}
