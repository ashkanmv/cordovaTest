import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DailyStatusPageRoutingModule } from './daily-status-routing.module';

import { DailyStatusPage } from './daily-status.page';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DailyStatusPageRoutingModule,
    NgSelectModule
  ],
  declarations: [DailyStatusPage]
})
export class DailyStatusPageModule {}
