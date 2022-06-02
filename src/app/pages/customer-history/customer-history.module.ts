import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CustomerHistoryPageRoutingModule } from './customer-history-routing.module';

import { CustomerHistoryPage } from './customer-history.page';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CustomerHistoryPageRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    NgSelectModule
  ],
  declarations: [CustomerHistoryPage],
})
export class CustomerHistoryPageModule {}
