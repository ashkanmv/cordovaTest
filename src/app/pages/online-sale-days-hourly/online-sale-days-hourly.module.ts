import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OnlineSaleDaysHourlyPageRoutingModule } from './online-sale-days-hourly-routing.module';

import { OnlineSaleDaysHourlyPage } from './online-sale-days-hourly.page';
import { NgSelectModule } from '@ng-select/ng-select';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OnlineSaleDaysHourlyPageRoutingModule,
    NgSelectModule,
    SharedModule
  ],
  declarations: [OnlineSaleDaysHourlyPage]
})
export class OnlineSaleDaysHourlyPageModule {}
