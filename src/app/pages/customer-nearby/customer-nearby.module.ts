import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CustomerNearbyPageRoutingModule } from './customer-nearby-routing.module';

import { CustomerNearbyPage } from './customer-nearby.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CustomerNearbyPageRoutingModule,
  ],
  declarations: [CustomerNearbyPage],
})
export class CustomerNearbyPageModule {}
