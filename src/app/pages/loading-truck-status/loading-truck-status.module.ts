import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoadingTruckStatusPageRoutingModule } from './loading-truck-status-routing.module';

import { LoadingTruckStatusPage } from './loading-truck-status.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoadingTruckStatusPageRoutingModule
  ],
  declarations: [LoadingTruckStatusPage]
})
export class LoadingTruckStatusPageModule {}
