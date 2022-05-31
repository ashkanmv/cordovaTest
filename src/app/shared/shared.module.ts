import { NgModule } from '@angular/core';
import { HighchartsChartModule } from 'highcharts-angular';
import { AreaChartsComponent } from '../charts/area-charts/area-charts.component';
import { ColumnChartsComponent } from '../charts/column-charts/column-charts.component';
import { VariableRadiusPieChartsComponent } from '../charts/pie-charts/pie-charts.component';
import { MapComponent } from '../map/map.component';
import { PopoverComponent } from './components/popover/popover.component';
import { SearchSelectComponent } from './components/search-select/search-select.component';

@NgModule({
  imports: [HighchartsChartModule],
  exports: [
    VariableRadiusPieChartsComponent,
    AreaChartsComponent,
    ColumnChartsComponent,
    MapComponent,
    SearchSelectComponent,
  ],
  declarations: [
    VariableRadiusPieChartsComponent,
    AreaChartsComponent,
    ColumnChartsComponent,
    MapComponent,
    PopoverComponent,
    SearchSelectComponent,
  ],
  providers: [],
})
export class SharedModule {}
