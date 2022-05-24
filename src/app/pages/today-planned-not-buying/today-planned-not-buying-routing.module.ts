import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TodayPlannedNotBuyingPage } from './today-planned-not-buying.page';

const routes: Routes = [
  {
    path: '',
    component: TodayPlannedNotBuyingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TodayPlannedNotBuyingPageRoutingModule {}
