import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MaxPPEDPage } from './max-pped.page';

const routes: Routes = [
  {
    path: '',
    component: MaxPPEDPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MaxPPEDPageRoutingModule {}
