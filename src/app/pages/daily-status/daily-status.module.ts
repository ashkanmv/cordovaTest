import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DailyStatusPageRoutingModule } from './daily-status-routing.module';

import { DailyStatusPage } from './daily-status.page';
import { NgSelectModule } from '@ng-select/ng-select';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DailyStatusPageRoutingModule,
    NgSelectModule,
    SharedModule
  ],
  declarations: [DailyStatusPage]
})
export class DailyStatusPageModule {}
