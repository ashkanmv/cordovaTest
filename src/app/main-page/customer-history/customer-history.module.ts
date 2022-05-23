import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CustomerHistoryPageRoutingModule } from './customer-history-routing.module';

import { CustomerHistoryPage } from './customer-history.page';
import { SharedModule } from 'src/app/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CustomerHistoryPageRoutingModule,
    SharedModule
  ],
  declarations: [CustomerHistoryPage]
})
export class CustomerHistoryPageModule {}
