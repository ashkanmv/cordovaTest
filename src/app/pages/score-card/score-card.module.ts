import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ScoreCardPageRoutingModule } from './score-card-routing.module';

import { ScoreCardPage } from './score-card.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ScoreCardPageRoutingModule,
    SharedModule,
  ],
  declarations: [ScoreCardPage],
})
export class ScoreCardPageModule {}
