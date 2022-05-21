import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OnlineDailySalesPage } from './online-daily-sales.page';

const routes: Routes = [
  {
    path: '',
    component: OnlineDailySalesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OnlineDailySalesPageRoutingModule {}
