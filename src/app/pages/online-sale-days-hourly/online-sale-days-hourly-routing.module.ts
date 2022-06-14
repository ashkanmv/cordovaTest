import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OnlineSaleDaysHourlyPage } from './online-sale-days-hourly.page';

const routes: Routes = [
  {
    path: '',
    component: OnlineSaleDaysHourlyPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OnlineSaleDaysHourlyPageRoutingModule {}
