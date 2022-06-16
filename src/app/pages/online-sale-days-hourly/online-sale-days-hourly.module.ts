import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OnlineSaleDaysHourlyPageRoutingModule } from './online-sale-days-hourly-routing.module';

import { OnlineSaleDaysHourlyPage } from './online-sale-days-hourly.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OnlineSaleDaysHourlyPageRoutingModule
  ],
  declarations: [OnlineSaleDaysHourlyPage]
})
export class OnlineSaleDaysHourlyPageModule {}
