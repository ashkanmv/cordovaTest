import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TraceSalesmanPageRoutingModule } from './trace-salesman-routing.module';

import { TraceSalesmanPage } from './trace-salesman.page';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TraceSalesmanPageRoutingModule,
    SharedModule,
    NgSelectModule,
    ReactiveFormsModule,
  ],
  declarations: [TraceSalesmanPage]
})
export class TraceSalesmanPageModule {}
