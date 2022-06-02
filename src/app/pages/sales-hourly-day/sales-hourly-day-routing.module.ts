import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SalesHourlyDayPage } from './sales-hourly-day.page';

const routes: Routes = [
  {
    path: '',
    component: SalesHourlyDayPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SalesHourlyDayPageRoutingModule {}
