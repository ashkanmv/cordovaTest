import { Component, Input, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-column-charts',
  templateUrl: './column-charts.component.html',
  styleUrls: ['./column-charts.component.scss'],
})
export class ColumnChartsComponent implements OnInit {
  private _series: any[] = [];
  private _columns: any[] = [];
  @Input() set series(v: any[]) {
    if (!v.length)
      return
    this._series = v;
    this.init();
  }
  @Input() set columns(v: string[]) {
    if (!v.length)
      return
    console.log(v);
    this._columns = v;
    this.init();
  }

  Highcharts: typeof Highcharts = Highcharts; // required
  chartConstructor: string = 'chart'; // optional string, defaults to 'chart'
  chartOptions: Highcharts.Options = {
    chart: {
      type: 'column'
    },
    // title: {
    //   text: ''
    // },
    // subtitle: {
    //   text: ''
    // },
    xAxis: {
      categories: this._columns,
      crosshair: true
    },
    yAxis: {
      min: 0,
      // title: {
      //   text: ''
      // }
    },
    tooltip: {
      headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
      pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
        '<td style="padding:0"><b>{point.y:.1f} </b></td></tr>',
      footerFormat: '</table>',
      shared: true,
      useHTML: true
    },
    plotOptions: {
      column: {
        pointPadding: 0.2,
        borderWidth: 0
      }
    },
    series: this._series
  }; // required
  // chartCallback: Highcharts.ChartCallbackFunction = function (chart) { ... } // optional function, defaults to null
  updateFlag: boolean = false; // optional boolean
  oneToOneFlag: boolean = true; // optional boolean, defaults to false
  runOutsideAngular: boolean = false; // optional boolean, defaults to false
  constructor() { }

  ngOnInit() {

  }

  init() {
    this.chartOptions = {
      chart: {
        type: 'column',
      },
      title: {
        text: ''
      },
      xAxis: {
        categories: this._columns,
        crosshair: true
      },
      yAxis: {
        min: 0,
        title: {
          text: ''
        }
      },
      tooltip: {
        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
        pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
          '<td style="padding:0"><b>{point.y:.1f}</b></td></tr>',
        footerFormat: '</table>',
        shared: true,
        useHTML: true
      },
      plotOptions: {
        // column: {
        //   pointPadding: 0.2,
        //   borderWidth: 0
        // }
      },
      series: this._series
    }
  }

  highcharts = Highcharts;
}
