import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TodayPlannedNotBuyingPageRoutingModule } from './today-planned-not-buying-routing.module';

import { TodayPlannedNotBuyingPage } from './today-planned-not-buying.page';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TodayPlannedNotBuyingPageRoutingModule,
    NgSelectModule
  ],
  declarations: [TodayPlannedNotBuyingPage]
})
export class TodayPlannedNotBuyingPageModule {}
