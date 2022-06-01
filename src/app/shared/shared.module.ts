import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HighchartsChartModule } from 'highcharts-angular';
import { AreaChartsComponent } from '../charts/area-charts/area-charts.component';
import { ColumnChartsComponent } from '../charts/column-charts/column-charts.component';
import { VariableRadiusPieChartsComponent } from '../charts/pie-charts/pie-charts.component';
import { MapComponent } from '../map/map.component';
import { PopoverComponent } from './components/popover/popover.component';
import { SearchSelectComponent } from './components/search-select/search-select.component';

@NgModule({
  imports: [HighchartsChartModule, CommonModule, FormsModule, IonicModule],
  exports: [
    VariableRadiusPieChartsComponent,
    AreaChartsComponent,
    ColumnChartsComponent,
    MapComponent,
    PopoverComponent,
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
