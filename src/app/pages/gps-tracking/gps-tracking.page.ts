import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Data, Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { MapService } from 'src/app/map/map.service';
import { getUserCildrenResponse } from 'src/app/shared/common';
import { PersianCalendarService } from 'src/app/shared/persian-calendar.service';
import { StorageService } from 'src/app/shared/storage.service';

@Component({
  selector: 'app-gps-tracking',
  templateUrl: './gps-tracking.page.html',
  styleUrls: ['./gps-tracking.page.scss'],
})
export class GpsTrackingPage implements OnInit {
  show = false;
  form: FormGroup;
  now_date = new Date().toISOString();
  rsms: getUserCildrenResponse[] = [];
  asms: getUserCildrenResponse[] = [];
  ssvs: getUserCildrenResponse[] = [];
  srs: getUserCildrenResponse[] = [];
  routes: any[] = [];
  constructor(private router: Router,
    private formBuilder: FormBuilder,
    private persianCalendarService: PersianCalendarService,
    private storageService: StorageService,
    private mapService: MapService,
    private loadingCtrl: LoadingController
  ) { }

  ngOnInit() {
    this.loadForm();
    this.init()
  }

  init() {
    this.storageService.get('user_id').then(user_id => {
      this.patchValue('userId', user_id);
    });

    this.storageService.get('access').then(access => {
      if (access)
        this.accessHandler(JSON.parse(access))
    })

    this.storageService.get('route_code').then(route_code => {
      if (route_code)
        this.patchValue('routeCode', route_code);
    })

    this.storageService.get('route_name').then(route_name => {
      if (route_name)
        this.patchValue('userRouteName', route_name);
      if (this.f.selectedSr.value && this.f.userRouteName.value) {
        this.getSrRouteAfterInit(this.f.selectedSr.value.id,this.f.selectedDate.value,this.f.userRouteName.value);
      }
    })
  }

  backButton() {
    this.router.navigate(['/']);
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

  get f() { return this.form.controls }

  accessHandler(accessJson: { name: string }[]) {
    var flg = false;
    accessJson.forEach(access => {
      if (access.name == 'gps_time')
        this.patchValue('accessTime', true)
      else if (access.name == 'gps_rsm') {
        this.patchValue('accessRsm', true)
        if (flg == false) {
          this.patchValue('selectedRsm', this.f.userId.value)
          this.rsmSelect();
          flg = true;
        }
      }
      else if (access.name == 'gps_asm') {
        this.patchValue('accessAsm', true)
        if (flg == false) {
          console.log('access');
          this.patchValue('selectedAsm', this.f.userId.value)
          this.asmSelect();
          flg = true;
        }
      }
      else if (access.name == 'gps_ssv') {
        this.patchValue('accessSsv', true)
        if (flg == false) {
          this.patchValue('selectedSsv', this.f.userId.value)
          this.ssvSelect();
          flg = true;
        }
      }
      else if (access.name == 'gps_sr') {
        this.patchValue('accessSr', true)
        if (flg == false) {
          this.patchValue('selectedSr', this.f.userId.value)
          this.srSelect();
          flg = true;
        }
      }
      else if (access.name == 'gps_route')
        if (flg == false) {
          this.patchValue('selectedRoute', this.f.userId.value)
          this.routeSelect();
          flg = true;
        }
    });
  }

  rsmSelect() {
    if (!this.f.selectedRsm.value)
      return
    let selected_rsm = this.f.selectedRsm.value;
    if (selected_rsm.id) {
      this.patchValue('selectedAsm', selected_rsm.id)
      // this.asmSelect();
      // this.patchValue('selectedSsv', null)
      this.ssvs = [];
      // this.ssvSelect();
      this.patchValue('selectedSr', null)
      this.srs = [];
      // this.srSelect();
    } else
      this.mapService.getUserCildren(selected_rsm).subscribe(res => {
        this.rsms = res
        console.log('rsms', res);

      })
  }

  asmSelect() {
    if (!this.f.selectedAsm.value)
      return
    let selected_asm = this.f.selectedAsm.value;
    if (selected_asm.id) {
      this.patchValue('selectedSsv', selected_asm.id)
      // this.ssvSelect();
      this.patchValue('selectedSr', null)
      this.srs = [];
      // this.srSelect();
    }
    else
      this.mapService.getUserCildren(selected_asm).subscribe(res => {
        this.asms = res
        console.log('asms', res);
      });

  }

  ssvSelect() {
    if (!this.f.selectedSsv.value)
      return
    console.log(this.f.selectedSsv.value);

    let selected_ssv = this.f.selectedSsv.value;
    if (selected_ssv.id) {
      this.patchValue('selectedSr', selected_ssv.id)
      // this.srSelect();
    }
    else {
      this.mapService.getUserCildren(selected_ssv).subscribe(res => this.ssvs = res);
    }
  }

  srSelect() {
    let selected_sr = this.f.selectedSr.value;
    if (selected_sr.id) {
      this.patchValue('selectedRoute', selected_sr.id)
    }
    else {
      this.mapService.getUserCildren(selected_sr)
        .subscribe(values => this.srs = values)
    }
  }

  routeSelect() {
    this.mapService.getSrRoute(this.f.selectedRoute.value, this.persianCalendarService.getVPTodayFormat(this.f.selectedDate.value)).subscribe((values: Data[]) => {
      console.log(values);
      this.routes = values;
    })
  }

  getSrRouteAfterInit(selected_Route: string, selected_date: Date,user_route_name : string) {
    this.mapService.getSrRoute(selected_Route, this.persianCalendarService.getTodayFormatEnd(selected_date))
      .subscribe((values :any[]) => {
        console.log(values);
        this.srs = values;
      })
  }

  patchValue(controller: string, value: any) {
    this.form.patchValue({ [controller]: value });
  }
}
