import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SalesHourlyDayPageRoutingModule } from './sales-hourly-day-routing.module';

import { SalesHourlyDayPage } from './sales-hourly-day.page';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SalesHourlyDayPageRoutingModule,
    NgSelectModule
  ],
  declarations: [SalesHourlyDayPage]
})
export class SalesHourlyDayPageModule {}
