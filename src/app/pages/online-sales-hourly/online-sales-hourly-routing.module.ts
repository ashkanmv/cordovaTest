import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OnlineSalesHourlyPage } from './online-sales-hourly.page';

const routes: Routes = [
  {
    path: '',
    component: OnlineSalesHourlyPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OnlineSalesHourlyPageRoutingModule {}
