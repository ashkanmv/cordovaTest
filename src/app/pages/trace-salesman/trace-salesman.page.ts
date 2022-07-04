import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { LoadingController } from '@ionic/angular';
import { LatLngTuple } from 'leaflet';
import { Subscription } from 'rxjs';
import { MapService } from 'src/app/map/map.service';
import { GetSalesmenLocationResponse, GetUserChildrenResponse, Language, MapView, Marker, Polyline } from 'src/app/shared/common';
import { LanguageService } from 'src/app/shared/language.service';
import { PersianCalendarService } from 'src/app/shared/persian-calendar.service';
import { SharedService } from 'src/app/shared/shared.service';
import { StorageService } from 'src/app/shared/storage.service';
import { TraceSalesmanService } from './trace-salesman.service';

@Component({
  selector: 'app-trace-salesman',
  templateUrl: './trace-salesman.page.html',
  styleUrls: ['./trace-salesman.page.scss'],
})
export class TraceSalesmanPage implements OnInit {
  mapView: MapView;
  form: FormGroup;
  show = false;
  showMap = false;
  selectedDate = new Date().toISOString();
  mapInitSubscription: Subscription;
  dcs: GetUserChildrenResponse[] = [];
  rsms: GetUserChildrenResponse[] = [];
  asms: GetUserChildrenResponse[] = [];
  ssvs: GetUserChildrenResponse[] = [];
  routes: GetUserChildrenResponse[] = [];
  srs: GetUserChildrenResponse[] = [];
  dcsPolylines: Polyline;
  rsmPolylines: Polyline;
  asmPolylines: Polyline;
  ssvPolylines: Polyline;
  routePolylines: Polyline;
  srPolylines: Polyline;
  polylines: Polyline[] = [];
  dcsMarker: Marker;
  rsmMarker: Marker;
  asmMarker: Marker;
  ssvMarker: Marker;
  routeMarker: Marker;
  srMarker: Marker;
  markers: Marker[] = [];
  public get language(): Language {
    return this.languageService.language;
  }
  public get isOnline() {
    return this.sharedService.isOnline;
  }

  constructor(
    private languageService: LanguageService,
    private mapService: MapService,
    private storageService: StorageService,
    private formBuilder: FormBuilder,
    private traceService: TraceSalesmanService,
    private sharedService: SharedService,
    private loadingCtrl: LoadingController,
    private persianCalendarService: PersianCalendarService
  ) {
    this.mapInitSubscription = this.mapService.mapInitialized.subscribe(
      (initialized: boolean) => {
        if (initialized) { }
      }
    );
  }

  ionViewDidEnter() {
    this.showMap = true;
  }

  ngOnInit() {
    this.getUserId();
    this.loadForm();
    this.checkAccess();
  }

  getUserId() {
    this.storageService.get('user_id').then((user_id) => {
      if (user_id) {
        this.patchValue('userId', user_id);
        this.patchValue('myUserID', user_id);
      }
    });
  }

  checkAccess() {
    this.storageService.get('access').then((access) => {
      if (access) this.accessHandler(JSON.parse(access));
    });
  }

  accessHandler(accessJson: { name: string }[]) {
    var flg = false;
    accessJson.forEach((access) => {
      if (access.name == 'gps_dc') {
        // this.access_dc = true;
      } else if (access.name == 'gps_time') {
        this.patchValue('accessTime', true);
      } else if (access.name == 'gps_rsm') {
        this.patchValue('accessRsm', true);
        if (flg == false) {
          this.patchValue('myUserType', 'rsm');
          this.loadRsms();
          flg = true;
        }
      } else if (access.name == 'gps_asm') {
        this.patchValue('accessAsm', true);
        if (flg == false) {
          this.patchValue('myUserType', 'asm');
          this.loadAsms(this.f.userId.value);
          flg = true;
        }
      } else if (access.name == 'gps_ssv') {
        this.patchValue('accessSsv', true);
        if (flg == false) {
          this.patchValue('myUserType', 'ssv');
          this.loadSsvs(this.f.userId.value);
          flg = true;
        }
      } else if (access.name == 'gps_sr') {
        this.patchValue('accessSr', true);
        if (flg == false) {
          this.patchValue('myUserType', 'sr');
          this.loadSrs(this.f.userId.value);
          flg = true;
        }
      }
    });
  }

  loadForm() {
    this.form = this.formBuilder.group({
      showSr: [true],
      showRsm: [true],
      showAsm: [true],
      showSsv: [true],
      accessTime: [false],
      accessRsm: [false],
      accessAsm: [false],
      accessSsv: [false],
      accessSr: [false],
      myUserType: [null],
      userId: [null],
      myUserID: [null],
      formDate: [new Date().toISOString()],
      selectedRsm: [null],
      selectedAsm: [null],
      selectedSsv: [null],
      selectedSr: [null],
    });
  }

  get f() {
    return this.form.controls;
  }

  ionViewWillLeave() {
    this.showMap = false;
    if (this.mapInitSubscription) this.mapInitSubscription.unsubscribe();
  }

  async loadRsms() {
    const loading = await this.loadingCtrl.create({
      message: this.language.Loading
    });
    loading.present();
    this.traceService.getUserChildren(this.f.userId.value).subscribe(res => {
      this.rsms = res;
      loading.dismiss();
    });
  }

  async loadAsms(id: string) {
    const loading = await this.loadingCtrl.create({
      message: this.language.Loading
    });
    loading.present();
    this.traceService.getUserChildren(id).subscribe(res => {
      this.asms = res;
      loading.dismiss();
    });
  }

  async loadSsvs(id: string) {
    const loading = await this.loadingCtrl.create({
      message: this.language.Loading
    });
    loading.present();
    this.traceService.getUserChildren(id).subscribe(res => {
      this.ssvs = res;
      loading.dismiss();
    });
  }

  async loadSrs(id: string) {
    const loading = await this.loadingCtrl.create({
      message: this.language.Loading
    });
    loading.present();
    this.traceService.getUserChildren(id).subscribe(res => {
      this.srs = res;
      loading.dismiss();
    });
  }

  async rsmSelect() {
    if (!this.f.selectedRsm.value)
      return
    const loading = await this.loadingCtrl.create({
      message: this.language.Loading
    });
    loading.present();
    this.rsmPolylines = null;
    this.mapService.clearPolylines.next(true);
    this.mapService.clearMarkers.next(true);
    this.patchValue('selectedAsm', null);
    this.patchValue('selectedSsv', null);
    this.patchValue('selectedSr', null);
    this.loadAsms(this.f.selectedRsm.value.id);
    this.getLocation(this.f.selectedRsm.value.id).then(locations => {
      if (!locations.length) {
        this.sharedService.toast('warning', this.language.Trace_Salesman.NoLocationFound)
        loading.dismiss();
        return
      }

      this.setPolylines('rsm', locations);
      this.setMarker('rsm', locations)
      loading.dismiss();
    })
  }

  async asmSelect() {
    if (!this.f.selectedAsm.value)
      return
    const loading = await this.loadingCtrl.create({
      message: this.language.Loading
    });
    loading.present();
    this.asmPolylines = null;
    this.mapService.clearPolylines.next(true);
    this.mapService.clearMarkers.next(true);
    this.patchValue('selectedSsv', null);
    this.patchValue('selectedSr', null);
    this.loadSsvs(this.f.selectedAsm.value.id);
    this.getLocation(this.f.selectedAsm.value.id).then(locations => {
      if (!locations.length) {
        this.sharedService.toast('warning', this.language.Trace_Salesman.NoLocationFound)
        loading.dismiss();
        return
      }

      this.setPolylines('asm', locations);
      this.setMarker('asm', locations)
      loading.dismiss();
    })
  }

  async ssvSelect() {
    if (!this.f.selectedSsv.value)
      return
    const loading = await this.loadingCtrl.create({
      message: this.language.Loading
    });
    loading.present();
    this.ssvPolylines = null;
    this.mapService.clearPolylines.next(true);
    this.mapService.clearMarkers.next(true);
    this.patchValue('selectedSr', null);
    this.loadSrs(this.f.selectedSsv.value.id);
    this.getLocation(this.f.selectedSsv.value.id).then(locations => {
      if (!locations.length) {
        this.sharedService.toast('warning', this.language.Trace_Salesman.NoLocationFound)
        loading.dismiss();
        return
      }

      this.setPolylines('ssv', locations);
      this.setMarker('ssv', locations)
      loading.dismiss();
    })
  }

  async srSelect() {
    if (!this.f.selectedSr.value)
      return
    const loading = await this.loadingCtrl.create({
      message: this.language.Loading
    });
    loading.present();
    this.srPolylines = null;
    this.mapService.clearPolylines.next(true);
    this.mapService.clearMarkers.next(true);
    this.getLocation(this.f.selectedSr.value.id).then(locations => {
      if (!locations.length) {
        this.sharedService.toast('warning', this.language.Trace_Salesman.NoLocationFound)
        loading.dismiss();
        return
      }

      this.setPolylines('sr', locations);
      this.setMarker('sr', locations)
      loading.dismiss();
    })
  }

  dateChanged() {
    if (this.f.selectedRsm.value && this.f.showRsm.value) this.rsmSelect();
    if (this.f.selectedAsm.value && this.f.showAsm.value) this.asmSelect();
    if (this.f.selectedSsv.value && this.f.showSsr.value) this.ssvSelect();
    if (this.f.selectedSr.value && this.f.showSr.value) this.srSelect();
  }

  getLocation(id: string): Promise<GetSalesmenLocationResponse[]> {
    return new Promise((resolve) =>
      this.traceService.getSalesmenLocation(id, this.persianCalendarService.getVPTodayFormat(new Date(this.selectedDate)), 0)
        .subscribe(res => resolve(res), () => resolve([])));
  }

  setPolylines(key: 'rsm' | 'asm' | 'ssv' | 'sr', locations: GetSalesmenLocationResponse[]) {
    let points: LatLngTuple[] = [];
    locations.forEach(loc => points.push([loc.lat, loc.lng]));
    switch (key) {
      case 'rsm':
        this.rsmPolylines = { latLng: points, options: this.mapService.rsmPolylineOption }
        break;
      case 'asm':
        this.asmPolylines = { latLng: points, options: this.mapService.asmPolylineOption }
        break;
      case 'ssv':
        this.ssvPolylines = { latLng: points, options: this.mapService.ssvPolylineOption }
        break;
      case 'sr':
        this.srPolylines = { latLng: points, options: this.mapService.srPolylineOption }
        break;
    }

    this.polylines = this.checkPolylines();
  }

  setMarker(key: 'rsm' | 'asm' | 'ssv' | 'sr', locations: GetSalesmenLocationResponse[]) {
    let lastLocation = locations[locations.length - 1];
    switch (key) {
      case 'rsm':
        this.rsmMarker = {
          latitude: lastLocation.lat,
          longitude: lastLocation.lng,
          icon: this.mapService.salesMenRsmIcon,
          description: `<div>
          <h1> ${lastLocation.Name} </h1>
          <h4> RSM </h4>
          </div>`
        }
        break;
      case 'asm':
        this.asmMarker = {
          latitude: lastLocation.lat,
          longitude: lastLocation.lng,
          icon: this.mapService.salesMenAsmIcon,
          description: `<div>
          <h1> ${lastLocation.Name} </h1>
          <h4> ASM </h4>
          </div>`
        }
        break;
      case 'ssv':
        this.ssvMarker = {
          latitude: lastLocation.lat,
          longitude: lastLocation.lng,
          icon: this.mapService.salesMenSsvIcon,
          description: `<div>
          <h1> ${lastLocation.Name} </h1>
          <h4> SSV </h4>
          </div>`
        }
        break;
      case 'sr':
        this.srMarker = {
          latitude: lastLocation.lat,
          longitude: lastLocation.lng,
          icon: this.mapService.salesMenSrIcon,
          description: `<div>
          <h1> ${lastLocation.Name} </h1>
          <h4> SR </h4>
          </div>`
        }
        break;
    }
    this.markers = this.checkMarkers();

    this.mapView = {
      lat: lastLocation.lat,
      lng: lastLocation.lng,
      zoom: 12
    }
  }

  showDataChanged(key: 'rsm' | 'asm' | 'ssv' | 'sr', value: boolean) {
    if (!value) {
      this.markers = this.checkMarkers();
      this.polylines = this.checkPolylines();
      return
    }

    switch (key) {
      case 'rsm':
        this.rsmSelect();
        break;
      case 'asm':
        this.asmSelect();
        break;
      case 'ssv':
        this.ssvSelect();
        break;
      case 'sr':
        this.srSelect();
        break;
    }
  }

  checkPolylines() {
    this.mapService.clearPolylines.next(true);
    let polylines: Polyline[] = [];
    if (this.rsmPolylines && this.f.showRsm.value) polylines.push(this.rsmPolylines)
    if (this.asmPolylines && this.f.showAsm.value) polylines.push(this.asmPolylines)
    if (this.ssvPolylines && this.f.showSsv.value) polylines.push(this.ssvPolylines)
    if (this.srPolylines && this.f.showSr.value) polylines.push(this.srPolylines)
    return polylines;
  }

  checkMarkers() {
    this.mapService.clearMarkers.next(true);
    let markers: Marker[] = [];
    if (this.rsmMarker && this.f.showRsm.value) markers.push(this.rsmMarker)
    if (this.asmMarker && this.f.showAsm.value) markers.push(this.asmMarker)
    if (this.ssvMarker && this.f.showSsv.value) markers.push(this.ssvMarker)
    if (this.srMarker && this.f.showSr.value) markers.push(this.srMarker)
    return markers;
  }

  patchValue(controller: string, value: any) {
    this.form.patchValue({ [controller]: value });
  }
}
