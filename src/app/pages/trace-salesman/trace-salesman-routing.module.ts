import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TraceSalesmanPage } from './trace-salesman.page';

const routes: Routes = [
  {
    path: '',
    component: TraceSalesmanPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TraceSalesmanPageRoutingModule {}
