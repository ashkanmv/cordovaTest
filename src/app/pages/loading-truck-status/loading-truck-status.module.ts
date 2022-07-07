import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoadingTruckStatusPageRoutingModule } from './loading-truck-status-routing.module';

import { LoadingTruckStatusPage } from './loading-truck-status.page';
import { NgSelectModule } from '@ng-select/ng-select';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoadingTruckStatusPageRoutingModule,
    NgSelectModule,
    SharedModule
  ],
  declarations: [LoadingTruckStatusPage]
})
export class LoadingTruckStatusPageModule {}
