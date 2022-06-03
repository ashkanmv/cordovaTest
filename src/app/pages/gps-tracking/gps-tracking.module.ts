import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GpsTrackingPageRoutingModule } from './gps-tracking-routing.module';

import { GpsTrackingPage } from './gps-tracking.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GpsTrackingPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [GpsTrackingPage]
})
export class GpsTrackingPageModule {}
