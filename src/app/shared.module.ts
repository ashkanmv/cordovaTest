import { NgModule } from '@angular/core';
import { HighchartsChartModule } from 'highcharts-angular';
import { VariableRadiusPieChartsComponent } from './charts/variable-radius-pie-charts/variable-radius-pie-charts.component';



@NgModule({
    imports: [HighchartsChartModule,],
    exports: [VariableRadiusPieChartsComponent],
    declarations: [VariableRadiusPieChartsComponent],
    providers: [],
})
export class SharedModule { }
