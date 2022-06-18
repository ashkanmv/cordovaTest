import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SalesCompareTrackingHourlyPageRoutingModule } from './sales-compare-tracking-hourly-routing.module';

import { SalesCompareTrackingHourlyPage } from './sales-compare-tracking-hourly.page';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SalesCompareTrackingHourlyPageRoutingModule,
    NgSelectModule
  ],
  declarations: [SalesCompareTrackingHourlyPage]
})
export class SalesCompareTrackingHourlyPageModule {}
