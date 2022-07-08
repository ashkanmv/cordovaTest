import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TodayPlannedNotBuyingPageRoutingModule } from './today-planned-not-buying-routing.module';

import { TodayPlannedNotBuyingPage } from './today-planned-not-buying.page';
import { NgSelectModule } from '@ng-select/ng-select';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TodayPlannedNotBuyingPageRoutingModule,
    NgSelectModule,
    SharedModule
  ],
  declarations: [TodayPlannedNotBuyingPage]
})
export class TodayPlannedNotBuyingPageModule {}
