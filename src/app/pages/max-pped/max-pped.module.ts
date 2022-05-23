import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MaxPPEDPageRoutingModule } from './max-pped-routing.module';

import { MaxPPEDPage } from './max-pped.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MaxPPEDPageRoutingModule
  ],
  declarations: [MaxPPEDPage]
})
export class MaxPPEDPageModule {}
