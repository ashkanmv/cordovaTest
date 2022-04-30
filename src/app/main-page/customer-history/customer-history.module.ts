import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CustomerHistoryPageRoutingModule } from './customer-history-routing.module';

import { CustomerHistoryPage } from './customer-history.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CustomerHistoryPageRoutingModule
  ],
  declarations: [CustomerHistoryPage]
})
export class CustomerHistoryPageModule {}
