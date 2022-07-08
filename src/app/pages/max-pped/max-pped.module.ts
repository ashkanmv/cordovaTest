import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MaxPPEDPageRoutingModule } from './max-pped-routing.module';

import { MaxPPEDPage } from './max-pped.page';
import { NgSelectModule } from '@ng-select/ng-select';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MaxPPEDPageRoutingModule,
    NgSelectModule,
    SharedModule
  ],
  declarations: [MaxPPEDPage],
})
export class MaxPPEDPageModule {}
