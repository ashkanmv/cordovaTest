import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { LoadingController } from '@ionic/angular';
import { LatLngTuple } from 'leaflet';
import { Subscription, timer } from 'rxjs';
import { MapService } from 'src/app/map/map.service';
import {
  ThemeColors, CommonUtility, GetInvoicedResponse, GetSrInfoResponse, getUserCildrenResponse, GetVehicleByRouteTimeResponse, Language, MapView, Marker, Polyline, Shop, VisitedNotBuyResponse,
} from 'src/app/shared/common';
import { LanguageService } from 'src/app/shared/language.service';
import { PersianCalendarService } from 'src/app/shared/persian-calendar.service';
import { SharedService } from 'src/app/shared/shared.service';
import { StorageService } from 'src/app/shared/storage.service';

@Component({
  selector: 'app-gps-tracking',
  templateUrl: './gps-tracking.page.html',
  styleUrls: ['./gps-tracking.page.scss'],
})
export class GpsTrackingPage implements OnInit, OnDestroy {
  loadingKey = 'routeSelect';
  loadings: LoadingController[] = [];
  firstLoad = false;
  CommonUtility = CommonUtility;
  notPlanFLoaded = false;
  initialShopPointLoaded = false;
  invoicedFLoaded = false;
  visitNotBuyLoaded = false;
  truckLoaded = false;
  srLoaded = false;
  notPlanFShopPoints: GetInvoicedResponse[] = [];
  invoicedShopPoints: GetInvoicedResponse[] = [];
  visitNotBuyShopPoints: VisitedNotBuyResponse[] = [];
  allShopPoints: Shop[] = [];
  showMap = false;
  show = false;
  form: FormGroup;
  selectedDate = new Date().toISOString();
  rsms: getUserCildrenResponse[] = [];
  asms: getUserCildrenResponse[] = [];
  ssvs: getUserCildrenResponse[] = [];
  srs: getUserCildrenResponse[] = [];
  custCodes: number[] = [];
  polylines: Polyline[] = [];
  mapView: MapView;
  srPoints: LatLngTuple[] = [];
  srInfo: any = {};
  private _markers: Marker[] = [];
  public get markers(): Marker[] {
    return this._markers;
  }
  set markers(v: Marker[]) {
    this._markers = v;
  }
  mapInitSubscription: Subscription;
  shopsSubscription: Subscription;
  srAndTruckSubscription: Subscription;

  public get language(): Language {
    return this.languageService.language;
  }

  public get isOnline() {
    return this.sharedService.isOnline;
  }
  public get backgroundColor(): ThemeColors {
    return this.sharedService.themeColor;
  }
  constructor(
    private formBuilder: FormBuilder,
    private persianCalendarService: PersianCalendarService,
    private storageService: StorageService,
    private mapService: MapService,
    private loadingCtrl: LoadingController,
    private languageService: LanguageService,
    public sharedService: SharedService
  ) {
    this.mapInitSubscription = this.mapService.mapInitialized.subscribe(
      (initialized: boolean) => {
        if (initialized && this.f.selectedRoute.value && !this.firstLoad) {
          this.firstLoad = true;
          this.initialSr();
          this.initialShopPoint();
        }
      }
    );
  }
  ngOnDestroy() {
    this.showMap = false;
    this.removeAllLoadings();
    if (this.mapInitSubscription) this.mapInitSubscription.unsubscribe();
    this.unsubscribeObsirvables()
  }

  ngOnInit() {
    this.loadForm();
    this.init();
  }

  ionViewDidEnter() {
    this.showMap = true;
  }

  init() {
    this.storageService.get('user_id').then((user_id) => {
      this.patchValue('userId', user_id);
    });

    this.storageService.get('access').then((access) => {
      if (access) this.accessHandler(JSON.parse(access));
    });

    this.storageService.get('route_code').then((route_code) => {
      if (route_code) this.patchValue('routeCode', route_code);
    });

    this.storageService.get('route_name').then((route_name) => {
      if (route_name) this.patchValue('userRouteName', route_name);
      if (this.f.selectedSr.value && this.f.userRouteName.value) {
        this.getSrRouteAfterInit(
          this.f.selectedSr.value.id,
          new Date(this.f.selectedDate.value),
          this.f.userRouteName.value
        );
      }
    });
  }

  loadForm() {
    this.form = this.formBuilder.group({
      userId: [null],
      formDate: [new Date().toISOString()],
      selectedDate: [new Date()],
      selectedRsm: [null],
      selectedAsm: [null],
      selectedSsv: [null],
      selectedSr: [null],
      selectedRoute: [null],
      showTruck: [true],
      showSr: [true],
      srTime: [this.persianCalendarService.getVPTodayFormat(new Date())],
      truckTime: [this.persianCalendarService.getVPTodayFormat(new Date())],
      accessTime: [false],
      accessRsm: [false],
      accessAsm: [false],
      accessSsv: [false],
      accessSr: [false],
      accessRoute: [true],
      routeCode: [null],
      userRouteName: [null],
    });
  }

  get f() { return this.form.controls; }

  accessHandler(accessJson: { name: string }[]) {
    var flg = false;
    accessJson.forEach((access) => {
      if (access.name == 'gps_time') this.patchValue('accessTime', true);
      else if (access.name == 'gps_rsm') {
        this.patchValue('accessRsm', true);
        if (flg == false) {
          this.patchValue('selectedRsm', this.f.userId.value);
          this.rsmSelect();
          flg = true;
        }
      } else if (access.name == 'gps_asm') {
        this.patchValue('accessAsm', true);
        if (flg == false) {
          this.patchValue('selectedAsm', this.f.userId.value);
          this.asmSelect();
          flg = true;
        }
      } else if (access.name == 'gps_ssv') {
        this.patchValue('accessSsv', true);
        if (flg == false) {
          this.patchValue('selectedSsv', this.f.userId.value);
          this.ssvSelect();
          flg = true;
        }
      } else if (access.name == 'gps_sr') {
        this.patchValue('accessSr', true);
        if (flg == false) {
          this.patchValue('selectedSr', this.f.userId.value);
          this.srSelect();
          flg = true;
        }
      } else if (access.name == 'gps_route')
        if (flg == false) {
          this.patchValue('selectedRoute', this.f.userId.value);
          this.routeSelect();
          flg = true;
        }
    });
  }

  rsmSelect() {
    if (!this.f.selectedRsm.value) return;
    let selected_rsm = this.f.selectedRsm.value;
    if (selected_rsm?.id) {
      this.patchValue('selectedAsm', selected_rsm.id);
      this.ssvs = [];
      this.patchValue('selectedSr', null);
      this.srs = [];
    } else
      this.mapService.getUserCildren(selected_rsm).subscribe((res) => {
        this.rsms = res;
      });
  }

  asmSelect() {
    if (!this.f.selectedAsm.value) return;
    let selected_asm = this.f.selectedAsm.value;
    if (selected_asm?.id) {
      this.patchValue('selectedSsv', selected_asm.id);
      this.patchValue('selectedSr', null);
      this.srs = [];
    } else
      this.mapService.getUserCildren(selected_asm).subscribe((res) => {
        this.asms = res;
      });
  }

  ssvSelect() {
    if (!this.f.selectedSsv.value) return;
    let selected_ssv = this.f.selectedSsv.value;
    if (selected_ssv?.id) {
      this.patchValue('selectedSr', selected_ssv.id);
    } else {
      this.mapService
        .getUserCildren(selected_ssv)
        .subscribe((res) => (this.ssvs = res));
    }
  }

  srSelect() {
    let selected_sr = this.f.selectedSr.value;
    if (selected_sr?.id) {
      this.patchValue('selectedRoute', selected_sr.id);
      this.routeSelect();
    } else {
      this.mapService
        .getUserCildren(selected_sr)
        .subscribe((values) => (this.srs = values));
    }
  }

  async routeSelect() {
    this.presentLoading(this.loadingKey);
    this.polylines = [];
    this.mapService.clearPolylines.next(true);
    this.notPlanFLoaded = false;
    this.initialShopPointLoaded = false;
    this.invoicedFLoaded = false;
    this.visitNotBuyLoaded = false;
    this.notPlanFShopPoints = [];
    this.invoicedShopPoints = [];
    this.visitNotBuyShopPoints = [];
    this.allShopPoints = [];
    this.custCodes = [];
    let selectedRoute = typeof this.f.selectedRoute.value == 'object' ? this.f.selectedRoute.value.routecode : this.f.selectedRoute.value;
    this.mapService
      .getSrRoute(
        selectedRoute,
        this.persianCalendarService.getVPTodayFormat(new Date(this.f.selectedDate.value))
      )
      .subscribe((values) => {
        if (values.length) this.patchValue('selectedRoute', values[0]);
        this.unsubscribeObsirvables();
        this.initialShopPoint();
        this.notPlanF();
        this.visitNotBuy();
        this.initialTruck();
        this.initialSr();
        this.startTimers()
      });
  }

  visitNotBuy() {
    let selectedRoute = typeof this.f.selectedRoute.value == 'object' ? this.f.selectedRoute.value.routecode : this.f.selectedRoute.value;
    this.mapService
      .getVisit_NotBuy(
        selectedRoute,
        this.CommonUtility.getInvoicedDate(new Date(this.f.selectedDate.value))
      )
      .subscribe((res) => {
        this.visitNotBuyLoaded = true;
        this.visitNotBuyShopPoints = res;
        this.handleDifferentShopPoints();
      });
  }
  notPlanF() {
    let selectedRoute = typeof this.f.selectedRoute.value == 'object' ? this.f.selectedRoute.value.routecode : this.f.selectedRoute.value;
    this.mapService
      .getOutOfPlan(
        selectedRoute,
        this.CommonUtility.getInvoicedDate(new Date(this.f.selectedDate.value))
      )
      .subscribe((res) => {
        this.notPlanFShopPoints = res;
        this.notPlanFLoaded = true;
        this.handleDifferentShopPoints();
      });
  }

  getSrRouteAfterInit(
    selected_Route: string,
    selected_date: Date,
    user_route_name: string
  ) {
    this.mapService
      .getSrRoute(
        selected_Route,
        this.persianCalendarService.getTodayFormatEnd(new Date(selected_date))
      )
      .subscribe((values: any[]) => {
        this.srs = values;
      });
  }

  initialShopPoint() {
    let selectedRoute = typeof this.f.selectedRoute.value == 'object' ? this.f.selectedRoute.value.routecode : this.f.selectedRoute.value;
    this.mapService
      .getShopPointByRouteName(
        selectedRoute,
        this.persianCalendarService.getVPTodayFormat(new Date(this.f.selectedDate.value))
      )
      .subscribe((shops) => {
        shops.forEach((shop) => this.custCodes.push(shop.CustCode, 10));
        this.allShopPoints = shops;
        this.initialShopPointLoaded = true;
        this.invoicedF();
        this.handleDifferentShopPoints();
      });
  }

  invoicedF() {
    if (!this.custCodes.length) {
      this.invoicedFLoaded = true;
      this.handleDifferentShopPoints();
      return;
    }

    this.mapService.getInvoiced(this.custCodes.join(','), this.CommonUtility.getInvoicedDate(new Date(this.f.selectedDate.value)))
      .subscribe((invoicedRes) => {
        this.invoicedShopPoints = invoicedRes;
        this.invoicedFLoaded = true;
        this.handleDifferentShopPoints();
      });
  }

  handleDifferentShopPoints() {
    if (
      !this.notPlanFLoaded ||
      !this.invoicedFLoaded ||
      !this.initialShopPointLoaded ||
      !this.visitNotBuyLoaded
    )
      return;

    let markers: Marker[] = [];
    this.invoicedShopPoints.forEach((invoice) => {
      this.custCodes.forEach((custCode) => {
        if (custCode != invoice.CustCode) return;

        let index = this.allShopPoints.findIndex(
          (x) => x.CustCode == invoice.CustCode
        );
        if (index < 0) return;
        let cust_code_index = this.custCodes.indexOf(invoice.CustCode);
        this.custCodes.splice(cust_code_index, 1);
        markers.push({
          latitude: +this.allShopPoints[index].PointLatitude,
          longitude: +this.allShopPoints[index].PointLongitude,
          icon: this.selectIcon('blue'),
          customerCode: +this.allShopPoints[index].CustCode,
          description: this.markerDescription('invoicedF', invoice),
        });
        this.allShopPoints.splice(index, 1);
      });
    });

    this.notPlanFShopPoints.forEach((point) => {
      let index = this.allShopPoints.findIndex(
        (x) => x.CustCode == point.CustCode
      );
      if (index != -1) this.allShopPoints.splice(index, 1);

      markers.push({
        latitude: +point.PointLatitude,
        longitude: +point.PointLongitude,
        icon: this.selectIcon('orange'),
        customerCode: +point.CustCode,
        description: this.markerDescription('notPlanF', point),
      });
    });

    this.visitNotBuyShopPoints.forEach((point) => {
      let index = this.allShopPoints.findIndex(
        (x) => x.CustCode == point.CustCode
      );
      if (index != -1) this.allShopPoints.splice(index, 1);
      markers.push({
        latitude: +point.PointLatitude,
        longitude: +point.PointLongitude,
        icon: this.selectIcon('red_black_circle'),
        customerCode: +point.CustCode,
        description: this.markerDescription('visitNotBuy', point),
      });
    });

    if (this.srLoaded) {
      markers.push(
        {
          latitude: this.srPoints[this.srPoints.length - 1][0],
          longitude: this.srPoints[this.srPoints.length - 1][1],
          icon: this.mapService.salesManIcon,
          description: this.markerDescription('salesman', this.srInfo)
        })
      let flyTo: MapView;
      flyTo = {
        lat: +this.srPoints[this.srPoints.length - 1][0],
        lng: +this.srPoints[this.srPoints.length - 1][1],
        zoom: 13,
      };
      this.mapView = flyTo;
    }

    this.allShopPoints.forEach((shop) => {
      markers.push({
        latitude: +shop.PointLatitude,
        longitude: +shop.PointLongitude,
        icon: this.selectIcon('red'),
        customerCode: +shop.CustCode,
        description: this.markerDescription('shopPoint', shop),
      });
    });
    this.markers = [...this.markers, ...markers];
    if (!this.markers.length) this.sharedService.toast('warning', this.language.Gps_Tracking.No_Value)
    else this.show = false;
    this.dismissLoading(this.loadingKey);
  }

  selectIcon(key: 'orange' | 'red' | 'blue' | 'red_black_circle') {
    switch (key) {
      case 'orange':
        return this.mapService.shop_orange;
      case 'blue':
        return this.mapService.shop_blue;
      case 'red':
        return this.mapService.shop_red;
      case 'red_black_circle':
        return this.mapService.shop_red_black_circle;
    }
  }

  initialTruck() {
    if (!this.f.showTruck.value || !this.f.selectedRoute.value.routename)
      return

    this.mapService
      .getVehicleByRouteTime(
        this.f.selectedRoute.value.routename,
        this.persianCalendarService.getTodayFormat(new Date(this.f.selectedDate.value)),
        this.persianCalendarService.getTodayFormatEnd(new Date(this.f.selectedDate.value))
      )
      .subscribe((res) => {
        if (!res.length) return;

        this.afterInitialTruck(res);
      });
  }

  afterInitialTruck(truckPoints: GetVehicleByRouteTimeResponse[]) {
    let truck_points: LatLngTuple[] = [];
    truckPoints.forEach((point) =>
      truck_points.push([point.Latitude, point.Longitude])
    );

    this.polylines = [
      ...this.polylines,
      {
        latLng: truck_points,
        options: this.mapService.TruckPolylineOption,
      },
    ];
    let lastTruckPoint = truckPoints[truckPoints.length - 1];
    this.markers = [
      ...this.markers,
      {
        latitude: lastTruckPoint.Latitude,
        longitude: lastTruckPoint.Longitude,
        description: this.markerDescription('truck', lastTruckPoint),
        icon: this.mapService.TruckIcon,
      },
    ];
  }

  initialSr() {
    if (!this.f.selectedRoute.value || !this.f.selectedRoute.value.routecode || !this.f.selectedSr.value)
      return
    this.mapService
      .getSrInfo(
        this.f.selectedRoute.value.routecode,
        this.persianCalendarService.getVPTodayFormat(new Date(this.f.selectedDate.value)),
        this.f.selectedSr.value.id
      )
      .subscribe((res) => {
        let srInfo = res[0];
        if (!srInfo) {
          this.sharedService.toast('danger', this.language.Gps_Tracking.NO_SR_Value);
          return;
        }

        this.getVPByRouteTimeUser(srInfo);
      });
  }

  getVPByRouteTimeUser(srInfo: GetSrInfoResponse) {
    this.mapService
      .getVPByRouteTimeUser(
        this.f.selectedRoute.value.routecode,
        this.persianCalendarService.getVPTodayFormat(new Date(this.f.selectedDate.value)),
        this.persianCalendarService.getVPTodayFormatEnd(
          new Date(this.f.selectedDate.value)
        ),
        this.f.selectedSr.value.id
      )
      .subscribe((res) => {
        if (!res.length) {
          this.sharedService.toast('danger', this.language.Gps_Tracking.NO_SR_Points);
          return;
        }

        let sr_points: LatLngTuple[] = [];
        res.forEach((srPoint) => sr_points.push([srPoint.lat, srPoint.lng]));
        this.srPoints = sr_points;
        this.srInfo = srInfo;

        if (!this.f.showSr.value)
          return
        // To handle timer
        this.mapService.clearMarkers.next(true);
        this.markers = [];

        this.polylines = [
          ...this.polylines,
          {
            latLng: sr_points,
            options: this.mapService.SalesManPolylineOption,
          },
        ];
        this.srLoaded = true;
        this.handleDifferentShopPoints();
      });
  }

  markerDescription(
    key:
      | 'salesman'
      | 'truck'
      | 'shopPoint'
      | 'invoicedF'
      | 'notPlanF'
      | 'visitNotBuy',
    info: any
  ) {
    switch (key) {
      case 'salesman':
        return `
        <div>
          <h1> ${info.Name} </h1>
          <div>
            <p>Route : ${info.Route} </p>
            <p>Total Planed : ${info.Total_Planed} </p>
            <p>Total Visited : ${info.Total_Visited} </p>
            <p>Total Invoiced : ${info.Total_Invoiced} </p>
            <p>First Invoiced : ${info.First_Invoiced} </p>
            <p>Last Invoiced : ${info.Last_Invoiced} </p>
            <p>Max Gap Invoiced : ${info.Max_Gap_Invoiced} </p>
            <p>Time To Route : ${info.Time_To_Route} </p>
            <p>Last invoiced To wh : ${info.Last_invoiced_To_wh} </p>
            <p>Last invoiced To wh : ${info.Last_invoiced_To_wh} </p>
          </div>
        </div>
        `;

      case 'truck':
        return `
        <div style="direction:rtl">
          <div>
            <p>Speed : ${info.Speed} </p>
            <p>Temp : ${info.Temp} </p>
            <p>TruckNo : ${info.TruckNo} </p>
          </div>
        </div>
        `;

      case 'shopPoint':
        return `
      <div style="direction:rtl;overflow: hidden"">
        <h1> ${info.custName} </h1>
        <div>
        <p>Code : ${info.CustCode} </p>
          <p>Customer type : ${info.CustTYPE} </p>
          <p>Tel : ${info.Tel} </p>
          <p>Visitor : ${info.Visitor} </p>
          <p>Address : ${info.ADDRESS} </p>
        </div>
        <table>
          <tr class="ion-align-self-center">
            <td style="width:40%;" ><img src="assets/mainPage/main/Customer-History.png" id="chBtn" catched="0"
                customer="'${info.CustCode}'"><br>Customer<br>History</td>
            <td style="width: 20%;"></td>
            <td style="width: 40%;"><img src="assets/mainPage/main/Questionnaire.png" id="quBtn" catched="0"
                customer="'+ ${info.CustCode}'"><br>Customer<br>Questionnaire</td>
          </tr>
        </table>
      </div>`;

      case 'invoicedF':
        return `
        <div style="direction:rtl">
          <div> 
            <p>DocNo : ${info.DocNo} </p>
            <p>Date : ${info.Date} </p>
            <p>Name : ${info.Name}   ${info.GranteeName} </p>
            <p>Code : ${info.CustCode} </p>
            <p>SaleKG : ${info.SaleKG} </p>
            <p>Tel : ${info.Tel} </p>
            <p>Street : ${info.Street} </p>
          </div>
            <table>
              <tr align=center><td width=40%><img src="assets/mainPage/main/Customer-History.png" id="chBtn" catched="0" 
                  customer=" ${info.CustCode} "><br>Customer<br>History</td>
              <td width=20%></td><td width=40%><img src="assets/mainPage/main/Questionnaire.png" id="quBtn" catched="0" 
                  customer=" ${info.CustCode} "><br>Customer<br>Questionnaire</td></tr>
            </table>
        </div>`;

      case 'notPlanF':
        return `
          <div style="direction:rtl"> +
              <div>
                <p>DocNo : ${info.DocNo} </p>
                <p>Name : ${info.Name}   ${info.GranteeName} </p>
                <p>Code : ${info.CustCode} </p>
                <p>SaleKG : ${info.SaleKG} </p>
                <p>Tel : ${info.Tel} </p>
                <p>Street : ${info.Street} </p>
              </div>
                <table>
                  <tr align=center><td width=40%><img src="assets/mainPage/main/Customer-History.png" id="chBtn" catched="0"
                      customer=" ${info.CustCode} "><br>Customer<br>History</td>
                  <td width=20%></td><td width=40%><img src="assets/mainPage/main/Questionnaire.png" id="quBtn" catched="0"
                      customer=" ${info.CustCode} "><br>Customer<br>Questionnaire</td></tr>
                </table>
              </div>`;

      case 'visitNotBuy':
        return `
          <div style="direction:rtl">
            <div>
              <p>DocNo : ${info.DocNo} </p>
              <p>Name : ${info.Name}  ${info.GranteeName} </p>
              <p>Code : ${info.CustCode} </p>
              <p>SaleKG : ${info.SaleKG} </p>
              <p>Tel : ${info.Tel} </p>
              <p>Street : ${info.Street} </p>
            </div>
            <table>
              <tr align=center><td width=40%><img src="assets/mainPage/main/Customer-History.png" id="chBtn" catched="0"
                  customer=" ${info.CustCode} "><br>Customer<br>History</td>
              <td width=20%></td><td width=40%><img src="assets/mainPage/main/Questionnaire.png" id="quBtn" catched="0"
                customer=" ${info.CustCode} "><br>Customer<br>Questionnaire</td></tr>
            </table>
          </div>`;
    }
  }

  dateChanged(date: string) {
    this.patchValue('selectedDate', date.slice(0, date.length - 6));
    if (this.f.selectedSr.value)
      this.srSelect();
  }

  showSrChanged(event) {
    let value = event.target.checked;
    if (!value) {
      this.markers = [];
      this.polylines = [];
      this.mapService.clearMarkers.next(true);
      this.mapService.clearPolylines.next(true);
      this.handleDifferentShopPoints();
    } else {
      if (!this.srPoints.length)
        return
      this.polylines = [
        ...this.polylines,
        {
          latLng: this.srPoints,
          options: this.mapService.SalesManPolylineOption,
        },
      ];
      this.markers = [
        ...this.markers,
        {
          latitude: this.srPoints[this.srPoints.length - 1][0],
          longitude: this.srPoints[this.srPoints.length - 1][1],
          icon: this.mapService.salesManIcon,
          description: this.markerDescription('salesman', this.srInfo),
        },
      ];
    }
  }

  patchValue(controller: string, value: any) {
    this.form.patchValue({ [controller]: value });
  }

  async presentLoading(key: string) {
    this.loadings[key] = await this.loadingCtrl.create({
      message: this.language.Loading
    });
    await this.loadings[key].present()
  }

  dismissLoading(key: string) {
    this.loadings[key]?.dismiss();
    delete this.loadings[key];
  }

  removeAllLoadings() {
    for (const key in this.loadings)
      this.loadings[key].dismiss()
    this.loadings = [];
  }

  startTimers() {
    let timer1 = timer(20000, 300000);
    this.shopsSubscription = timer1.subscribe(t => {
      this.initialShopPointLoaded = false;
      this.initialShopPoint();
      this.notPlanFLoaded = false;
      this.notPlanF();
      this.visitNotBuyLoaded = false;
      this.visitNotBuy();
    });
    let timer2 = timer(20000, 60000);
    this.srAndTruckSubscription = timer2.subscribe(() => {
      this.polylines = [];
      this.mapService.clearPolylines.next(true);
      this.initialTruck();
      this.initialSr();
    })
  }

  unsubscribeObsirvables() {
    if (this.shopsSubscription)
      this.shopsSubscription.unsubscribe();
    if (this.srAndTruckSubscription)
      this.srAndTruckSubscription.unsubscribe();
  }
}
