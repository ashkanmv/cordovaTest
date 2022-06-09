import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DailyStatusPage } from './daily-status.page';

const routes: Routes = [
  {
    path: '',
    component: DailyStatusPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DailyStatusPageRoutingModule {}
