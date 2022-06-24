import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SalesmenLocationPageRoutingModule } from './salesmen-location-routing.module';

import { SalesmenLocationPage } from './salesmen-location.page';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SalesmenLocationPageRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    NgSelectModule
  ],
  declarations: [SalesmenLocationPage],
})
export class SalesmenLocationPageModule {}
