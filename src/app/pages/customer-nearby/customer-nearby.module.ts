import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CustomerNearbyPageRoutingModule } from './customer-nearby-routing.module';

import { CustomerNearbyPage } from './customer-nearby.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CustomerNearbyPageRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ],
  declarations: [CustomerNearbyPage],
})
export class CustomerNearbyPageModule {}
