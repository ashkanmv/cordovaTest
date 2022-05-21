import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CustomerNearbyPage } from './customer-nearby.page';

const routes: Routes = [
  {
    path: '',
    component: CustomerNearbyPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomerNearbyPageRoutingModule {}
