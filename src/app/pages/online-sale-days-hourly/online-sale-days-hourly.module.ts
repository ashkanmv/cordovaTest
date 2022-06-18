import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OnlineSaleDaysHourlyPageRoutingModule } from './online-sale-days-hourly-routing.module';

import { OnlineSaleDaysHourlyPage } from './online-sale-days-hourly.page';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OnlineSaleDaysHourlyPageRoutingModule,
    NgSelectModule
  ],
  declarations: [OnlineSaleDaysHourlyPage]
})
export class OnlineSaleDaysHourlyPageModule {}
