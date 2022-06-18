import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ScoreCardPageRoutingModule } from './score-card-routing.module';

import { ScoreCardPage } from './score-card.page';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ScoreCardPageRoutingModule,
    SharedModule,
    NgSelectModule
  ],
  declarations: [ScoreCardPage],
})
export class ScoreCardPageModule {}
