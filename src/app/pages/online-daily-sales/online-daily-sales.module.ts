import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OnlineDailySalesPageRoutingModule } from './online-daily-sales-routing.module';

import { OnlineDailySalesPage } from './online-daily-sales.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OnlineDailySalesPageRoutingModule
  ],
  declarations: [OnlineDailySalesPage]
})
export class OnlineDailySalesPageModule {}
