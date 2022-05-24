import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SalesmenLocationPage } from './salesmen-location.page';

const routes: Routes = [
  {
    path: '',
    component: SalesmenLocationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SalesmenLocationPageRoutingModule {}
