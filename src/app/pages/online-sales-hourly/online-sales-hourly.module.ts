import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OnlineSalesHourlyPageRoutingModule } from './online-sales-hourly-routing.module';

import { OnlineSalesHourlyPage } from './online-sales-hourly.page';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OnlineSalesHourlyPageRoutingModule,
    NgSelectModule
  ],
  declarations: [OnlineSalesHourlyPage]
})
export class OnlineSalesHourlyPageModule {}
