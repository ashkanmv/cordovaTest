import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CustomerHistorytoryPage } from './customer-historytory.page';

const routes: Routes = [
  {
    path: '',
    component: CustomerHistorytoryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomerHistorytoryPageRoutingModule {}
