import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SalesCompareTrackingHourlyPage } from './sales-compare-tracking-hourly.page';

const routes: Routes = [
  {
    path: '',
    component: SalesCompareTrackingHourlyPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SalesCompareTrackingHourlyPageRoutingModule {}
