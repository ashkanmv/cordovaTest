import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SalesmenLocationPageRoutingModule } from './salesmen-location-routing.module';

import { SalesmenLocationPage } from './salesmen-location.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SalesmenLocationPageRoutingModule
  ],
  declarations: [SalesmenLocationPage]
})
export class SalesmenLocationPageModule {}
