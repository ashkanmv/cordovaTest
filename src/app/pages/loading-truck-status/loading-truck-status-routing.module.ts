import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoadingTruckStatusPage } from './loading-truck-status.page';

const routes: Routes = [
  {
    path: '',
    component: LoadingTruckStatusPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoadingTruckStatusPageRoutingModule {}
