import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { MapService } from 'src/app/map/map.service';
import { PersianCalendarService } from 'src/app/shared/persian-calendar.service';
import { StorageService } from 'src/app/shared/storage.service';

@Component({
  selector: 'app-gps-tracking',
  templateUrl: './gps-tracking.page.html',
  styleUrls: ['./gps-tracking.page.scss'],
})
export class GpsTrackingPage implements OnInit {
  form: FormGroup;
  now_date = new Date().toISOString();
  rsmList = [];
  asms = [];
  ssvs = [];
  srs = [];

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
    this.storageService.get('user_id').then((user_id) => {
      this.patchValue('userId', user_id);
    });

    this.storageService.get('access').then((access) => {
      if (access)
        this.accessHandler(JSON.parse(access))
    })

    this.storageService.get('route_code').then(route_code => {

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
      accessSr: [false]
    });
  }

  get f() {
    return this.form.controls;
  }

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
      else if (access.name == 'gps_asm')
        this.patchValue('accessAsm', true)
      else if (access.name == 'gps_ssv')
        this.patchValue('accessSsv', true)
      else if (access.name == 'gps_sr')
        this.patchValue('accessSr', true)
      else if (access.name == 'gps_route')
        this.patchValue('selectedRoute', true)
    });
  }

  rsmSelect() {
    let selected_rsm = this.f.selectedRsm.value;
    if (selected_rsm.id) {
      this.patchValue('selectedAsm', selected_rsm.id)
      this.asmSelect();
      this.patchValue('selectedSsv', null)
      this.ssvs = [];
      this.ssvSelect();
      this.patchValue('selected_sr', null)
      this.srs = [];
      // this.srSelect();
    } else
      this.mapService.getUserCildren(selected_rsm).subscribe(res => this.rsmList = res)
  }

  asmSelect() {
    let selected_asm = this.f.selectedRsm.value;
    if (selected_asm.id) {
      this.patchValue('selectedSsv', selected_asm.id)
      this.ssvSelect();
      this.patchValue('selected_sr', null)
      this.srs = [];
      // this.srSelect();
    }
    else {
      this.mapService.getUserCildren(selected_asm).subscribe(res => this.asms = res);
    }
  }

  ssvSelect() {
    let selected_ssv = this.f.selectedSsv.value;
    if (selected_ssv.id) {
      this.patchValue('selectedSr', selected_ssv.id)
      this.sr_select();
    }
    else {
      this.mapService.getUserCildren(selected_ssv).subscribe(res => this.ssvs = res);
    }
  }

  sr_select() {
    let selected_sr = this.f.selectedSr.value;
    if (selected_sr.id != undefined) {
      this.patchValue('selectedRoute', selected_sr.id)
      // this.route_select();
    }
    else {
      this.mapService.getUserCildren(selected_sr)
        .subscribe(values => this.srs = values)
    }
  }

  patchValue(controller: string, value: any) {
    this.form.patchValue({ [controller]: value });
  }
}
