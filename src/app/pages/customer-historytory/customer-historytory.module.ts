import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CustomerHistorytoryPageRoutingModule } from './customer-historytory-routing.module';

import { CustomerHistorytoryPage } from './customer-historytory.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CustomerHistorytoryPageRoutingModule
  ],
  declarations: [CustomerHistorytoryPage]
})
export class CustomerHistorytoryPageModule {}
