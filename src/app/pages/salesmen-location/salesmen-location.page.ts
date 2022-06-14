import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Data, Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';
import { MapService } from 'src/app/map/map.service';
import { PopoverComponent } from 'src/app/shared/components/popover/popover.component';
import { PersianCalendarService } from 'src/app/shared/persian-calendar.service';
import { StorageService } from 'src/app/shared/storage.service';

@Component({
  selector: 'app-salesmen-location',
  templateUrl: './salesmen-location.page.html',
  styleUrls: ['./salesmen-location.page.scss'],
})
export class SalesmenLocationPage implements OnInit {
  dateNow = new Date();
  show = false;
  form: FormGroup;
  rsms = [];
  selectedRsm;
  rsmPoints;
  userIds = [];
  constructor(
    private router: Router,
    public popoverctrl: PopoverController,
    private persianCalendarService: PersianCalendarService,
    private formBuilder: FormBuilder,
    private storageService: StorageService,
    private mapService: MapService
  ) {}

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

  loadForm() {
    this.form = this.formBuilder.group({
      DC: [null],
      Route: [null],
      Customer: [null],
      type: ['sales'],
      kgqty: ['qty'],
      showPointSd: [true],
      showPointRsm: [true],
      showPointAsm: [true],
      showPointSsv: [true],
      showPointSr: [true],
      showTruck: [true],
      showSr: [true],
      showRsm: [true],
      showAsm: [true],
      showSsv: [true],
      accessTime: [false],
      accessRsm: [false],
      myUserType: [null],
      userId: [null],
      myUserID: [null],
      selectedDate: [new Date()],
      formDate: [new Date().toISOString()],
      srTime: [this.persianCalendarService.getVPTodayFormat(new Date())],
      truckTime: [this.persianCalendarService.getTodayFormat(new Date())],
    });
  }

  get f() {
    return this.form.controls;
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
          this.rsmSelect();
          flg = true;
        }
      } else if (access.name == 'gps_asm') {
        this.patchValue('accessAsm', true);
        if (flg == false) {
          this.patchValue('myUserType', 'asm');

          this.asmSelect();

          flg = true;
        }
      } else if (access.name == 'gps_ssv') {
        this.patchValue('accessSsv', true);
        if (flg == false) {
          this.patchValue('myUserType', 'ssv');
          this.ssv_select();
          flg = true;
        }
      } else if (access.name == 'gps_sr') {
        this.patchValue('accessSr', true);
        if (flg == false) {
          this.patchValue('myUserType', 'sr');
          this.sr_select();
          flg = true;
        }
      }
    });
  }

  rsmSelect() {
    if (this.rsms.length) {
    } else {
      this.mapService
        .getallChildrenUser(this.f.myUserID.value, 'rsm', ' ')
        .subscribe((res) => {
          this.selectedRsm = [];
          this.rsms = res;
          let userId = '';
          this.rsms.forEach((v) => {
            userId = userId + ',' + v.id;
            this.selectedRsm.push(v.id);
          });
          this.rsmPoints = [];
          this.smlRsmPoints();

          this.asmSelect();
        });
    }
  }

  smlRsmPoints() {
    this.mapService
      .getallChildrenUser([], 'rsm', this.selectedRsm)
      .subscribe((res) => {
        this.userIds = [];
        if (!res.length) return;
        res.forEach((r) => this.userIds.push(r.id));
        this.getSalesmanLocation();
      });
  }

  getSalesmanLocation() {
    this.mapService
      .getSalesmenLocation(
        this.userIds,
        this.persianCalendarService.getVPTodayFormat(this.f.selectedDate.value),
        1
      )
      .subscribe((data) => console.log(data));
  }

  asmSelect() {}
  ssv_select() {}
  sr_select() {}

  async presentPopover(ev: any) {
    const popover = await this.popoverctrl.create({
      component: PopoverComponent,
      cssClass: 'custom-class',
      event: ev,
      translucent: true,
    });
    await popover.present();

    const { role } = await popover.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }

  patchValue(controller: string, value: any) {
    this.form.patchValue({ [controller]: value });
  }
}
