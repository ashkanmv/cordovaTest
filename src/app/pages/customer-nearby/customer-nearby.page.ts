import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { MapService } from 'src/app/map/map.service';
import { MapView, Marker, PopoverItem, Shop } from 'src/app/shared/common';
import { PopoverComponent } from 'src/app/shared/components/popover/popover.component';
import { GeoLocationService } from 'src/app/shared/geo-location.service';
import { PersianCalendarService } from 'src/app/shared/persian-calendar.service';
import { StorageService } from 'src/app/shared/storage.service';

@Component({
  selector: 'app-customer-nearby',
  templateUrl: './customer-nearby.page.html',
  styleUrls: ['./customer-nearby.page.scss'],
})
export class CustomerNearbyPage implements OnInit {
  showMap = false;                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          
  accessSr = false;
  form: FormGroup;
  mapInitSubscription: Subscription;
  shops: Shop[] = [];
  mapView: MapView;
  private _markers: Marker[] = [];
  public get markers(): Marker[] { return this._markers }
  set markers(v: Marker[]) { this._markers = v }

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private persianCalendarService: PersianCalendarService,
    private storageService: StorageService,
    private mapService: MapService,
    private popoverCtrl: PopoverController,
    private geoLocation : GeoLocationService
  ) {
    this.mapInitSubscription = this.mapService.mapInitialized.subscribe((initialized: boolean) => {
      if (initialized) {
        this.getCurrentLocation();
      }
    })
  }

  ngOnInit() {
    this.loadForm();
    this.checkAccess();
  }

  ionViewDidEnter() {
    this.showMap = true;
  }

  ionViewWillLeave() {
    this.showMap = false;
    this.mapInitSubscription.unsubscribe();
  }

  getCurrentLocation(){
    this.geoLocation.getCurrentLocation().then(location=> {
      this.patchValue('currentLat',location.latitude);
      this.patchValue('currentLng',location.longitude);

      this.changeMapView();
      this.initialSr();
      this.initialShopPoint();
    })
  }

  loadForm() {
    this.form = this.formBuilder.group({
      srTime: [this.persianCalendarService.getVPTodayFormat(new Date())],
      truckTime: [this.persianCalendarService.getTodayFormat(new Date())],
      selectedDate: [new Date()],
      formDate: [new Date().toISOString()],
      accessSr: [false],
      selectedDistance: [100],
      currentLat: [null],
      currentLng: [null],
    });
  }

  get f() { return this.form.controls }

  checkAccess() {
    this.storageService.get('access').then((access) => {
      if (access) {
        let jsonAccess = JSON.parse(access);
        for (var i = 0; i < jsonAccess.length; i++) {
          if (jsonAccess[i].name == 'gps_sr') {
            this.accessSr = true;
            break;
          }
        }
      }
    });
  }

  initialSr() {
    this.addMarker([{
      latitude: this.f.currentLat.value,
      longitude: this.f.currentLng.value,
      icon: this.mapService.salesManIcon
    }]);
  }

  addMarker(markers: Marker[]) {
    this.markers = markers;
  }

  initialShopPoint() {
    this.mapService.getShopsrNearPointsLatlng(this.f.currentLat.value, this.f.currentLng.value, this.f.selectedDistance.value)
      .subscribe(shops => {
        this.shops = shops;
        if (this.shops.length) {
          let markers: Marker[] = [];
          this.shops.forEach(shop => {
            let marker: Marker = {
              latitude: +shop.PointLatitude,
              longitude: +shop.PointLongitude,
              icon: this.selectIcon(shop),
              customerCode: +shop.CustCode,
              description:
                `<div style="direction:rtl">
                <h1> ${shop.custName} </h1>
                <div>
                  <p>Customer type : ${shop.CustTYPE} </p>
                  <p>Tel : ${shop.Tel} </p>
                  <p>Visitor : ${shop.Visitor} </p>
                  <p>Address : ${shop.ADDRESS} </p>
                  <p>SixWeekPPED : ${shop.SixWeekPPED} %</p>
                  <p>TwoWeeks Visited : ${shop.TwoWeek} </p>
                </div>
                <table>
                  <tr class="ion-align-self-center">
                    <td style="width:40%;" ><img src="assets/mainPage/main/Customer-History.png" id="chBtn" catched="0"
                        customer="'${shop.CustCode}'"><br>Customer<br>History</td>
                    <td style="width: 20%;"></td>
                    <td style="width: 40%;"><img src="assets/mainPage/main/Questionnaire.png" id="quBtn" catched="0"
                        customer="'+ ${shop.CustCode}'"><br>Customer<br>Questionnaire</td>
                  </tr>
                </table>
              </div>`
            };
            markers.push(marker);
          });
          this.markers = markers;
        }
      })
  }

  selectIcon(shop: Shop) {
    if (shop.TwoWeek != 0 && shop.SixWeekPPED < 5 && shop.MonthPromotion != 1)
      return this.mapService.shop_point;
    else if (shop.TwoWeek == 0 && shop.SixWeekPPED < 5 && shop.MonthPromotion != 1)
      return this.mapService.shop_NotBuyWeeks;
    else if (shop.TwoWeek != 0 && shop.SixWeekPPED >= 5 && shop.MonthPromotion != 1)
      return this.mapService.shop_Max_PPED;
    else if (shop.TwoWeek == 0 && shop.SixWeekPPED >= 5 && shop.MonthPromotion != 1)
      return this.mapService.shop_Max_PPED_NotBuy;
    else if (shop.TwoWeek != 0 && shop.SixWeekPPED < 5 && shop.MonthPromotion == 1)
      return this.mapService.shop_Month_Promotion;
    else if (shop.TwoWeek == 0 && shop.SixWeekPPED < 5 && shop.MonthPromotion == 1)
      return this.mapService.shop_Promo_NotBuyWeeks;
    else if (shop.TwoWeek != 0 && shop.SixWeekPPED >= 5 && shop.MonthPromotion == 1)
      return this.mapService.shop_Promo_Max_PPED;
    else if (shop.TwoWeek == 0 && shop.SixWeekPPED >= 5 && shop.MonthPromotion == 1)
      return this.mapService.shop_Promo_Max_PPED_NotBuy;
  }

  items: PopoverItem[] = [{
    title: '50 M',
    value: 50,
    selected: false
  }, {
    title: '100 M',
    value: 100,
    selected: true
  }, {
    title: '500 M',
    value: 500,
    selected: false
  }, {
    title: '700 M',
    value: 700,
    selected: false
  }, {
    title: '1 KM',
    value: 1000,
    selected: false
  }]

  presentPopover(ev: any) {
    this.popoverCtrl.create({
      component: PopoverComponent,
      cssClass: 'popover',
      event: ev,
      animated: true,
      componentProps: { items: this.items },
      translucent: false
    }).then(modalEl => {
      modalEl.present();
      return modalEl.onDidDismiss();
    }).then(resultData => {
      if (resultData.data)
        this.distanceChanged(resultData.data);
    });
  }

  distanceChanged(distance: number) {
    this.patchValue('selectedDistance', distance);
    this.mapService.clearMarkers.next(true);
    this.changeMapView();
  }

  changeMapView() {
    switch (this.f.selectedDistance.value) {
      case 50:
        this.mapView = {
          lat: this.f.currentLat.value,
          lng: this.f.currentLng.value,
          zoom: 19
        }
        break;

      case 50:
        this.mapView = {
          lat: this.f.currentLat.value,
          lng: this.f.currentLng.value,
          zoom: 19
        }
        break;
      case 100:
        this.mapView = {
          lat: this.f.currentLat.value,
          lng: this.f.currentLng.value,
          zoom: 18
        }
        break;
      case 500:
        this.mapView = {
          lat: this.f.currentLat.value,
          lng: this.f.currentLng.value,
          zoom: 16
        }

        break;
      case 700:
        this.mapView = {
          lat: this.f.currentLat.value,
          lng: this.f.currentLng.value,
          zoom: 15
        }
        break;
      case 1000:
        this.mapView = {
          lat: this.f.currentLat.value,
          lng: this.f.currentLng.value,
          zoom: 14
        }
        break;
      default:
        break;
    }
  }

  patchValue(controller: string, value: any) {
    this.form.patchValue({ [controller]: value });
  }
}
