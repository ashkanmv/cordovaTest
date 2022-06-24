import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoadingTruckStatusPageRoutingModule } from './loading-truck-status-routing.module';

import { LoadingTruckStatusPage } from './loading-truck-status.page';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoadingTruckStatusPageRoutingModule,
    NgSelectModule
  ],
  declarations: [LoadingTruckStatusPage]
})
export class LoadingTruckStatusPageModule {}
