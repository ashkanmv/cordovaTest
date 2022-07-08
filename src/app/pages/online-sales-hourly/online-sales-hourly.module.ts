import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OnlineSalesHourlyPageRoutingModule } from './online-sales-hourly-routing.module';

import { OnlineSalesHourlyPage } from './online-sales-hourly.page';
import { NgSelectModule } from '@ng-select/ng-select';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OnlineSalesHourlyPageRoutingModule,
    NgSelectModule,
    SharedModule
  ],
  declarations: [OnlineSalesHourlyPage]
})
export class OnlineSalesHourlyPageModule {}
