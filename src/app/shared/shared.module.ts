import { NgModule } from '@angular/core';
import { HighchartsChartModule } from 'highcharts-angular';
import { AreaChartsComponent } from '../charts/area-charts/area-charts.component';
import { ColumnChartsComponent } from '../charts/column-charts/column-charts.component';
import { VariableRadiusPieChartsComponent } from '../charts/pie-charts/pie-charts.component';
import { MapComponent } from '../map/map.component';
import { PopoverComponent } from '../pages/components/popover/popover.component';

@NgModule({
  imports: [HighchartsChartModule],
  exports: [
    VariableRadiusPieChartsComponent,
    AreaChartsComponent,
    ColumnChartsComponent,
    MapComponent,
    PopoverComponent,
  ],
  declarations: [
    VariableRadiusPieChartsComponent,
    AreaChartsComponent,
    ColumnChartsComponent,
    MapComponent,
    PopoverComponent,
  ],
  providers: [],
})
export class SharedModule {}
