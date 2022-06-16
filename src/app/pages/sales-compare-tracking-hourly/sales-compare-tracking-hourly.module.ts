import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SalesCompareTrackingHourlyPageRoutingModule } from './sales-compare-tracking-hourly-routing.module';

import { SalesCompareTrackingHourlyPage } from './sales-compare-tracking-hourly.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SalesCompareTrackingHourlyPageRoutingModule
  ],
  declarations: [SalesCompareTrackingHourlyPage]
})
export class SalesCompareTrackingHourlyPageModule {}
