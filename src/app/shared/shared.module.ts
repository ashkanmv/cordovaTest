import { NgModule } from '@angular/core';
import { HighchartsChartModule } from 'highcharts-angular';
import { AreaChartsComponent } from '../charts/area-charts/area-charts.component';
import { ColumnChartsComponent } from '../charts/column-charts/column-charts.component';
import { VariableRadiusPieChartsComponent } from '../charts/pie-charts/pie-charts.component';
import { MapComponent } from '../map/map.component';

@NgModule({
  imports: [HighchartsChartModule],
  exports: [
    VariableRadiusPieChartsComponent,
    AreaChartsComponent,
    ColumnChartsComponent,
    MapComponent,
  ],
  declarations: [
    VariableRadiusPieChartsComponent,
    AreaChartsComponent,
    ColumnChartsComponent,
    MapComponent,
  ],
  providers: [],
})
export class SharedModule {}
