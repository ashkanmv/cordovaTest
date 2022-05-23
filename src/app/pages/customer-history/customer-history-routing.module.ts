import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CustomerHistoryPage } from './customer-history.page';

const routes: Routes = [
  {
    path: '',
    component: CustomerHistoryPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomerHistoryPageRoutingModule {}
