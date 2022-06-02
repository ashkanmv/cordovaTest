import { Component, Input, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-pie-charts',
  templateUrl: './pie-charts.component.html',
  styleUrls: ['./pie-charts.component.scss'],
})
export class VariableRadiusPieChartsComponent implements OnInit {
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
    this._columns = v;
    this.init();
  }
  Highcharts: typeof Highcharts = Highcharts; // required
  chartConstructor: string = 'chart'; // optional string, defaults to 'chart'
  chartOptions: Highcharts.Options = {
    chart: {
      plotBackgroundColor: 'silver',
      plotBorderWidth: 2,
      plotShadow: true,
      type: 'pie'
    },
    title: {
      text: ''
    },
    tooltip: {
      pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          enabled: true,
          format: '<b>{point.name}</b>: {point.percentage:.1f} %'
        }
      }
    },
    series: this._series,
    // [{
    //   name: 'Brands',
    //   colorByPoint: true,
    //   type: undefined,
    //   data: [{
    //     name: 'Chrome',
    //     y: 61.41,
    //     sliced: true,
    //     selected: true
    //   }, {
    //     name: 'Internet Explorer',
    //     y: 11.84
    //   }, {
    //     name: 'Firefox',
    //     y: 10.85
    //   }, {
    //     name: 'Edge',
    //     y: 4.67
    //   }, {
    //     name: 'Safari',
    //     y: 4.18
    //   }, {
    //     name: 'Sogou Explorer',
    //     y: 1.64
    //   }, {
    //     name: 'Opera',
    //     y: 1.6
    //   }, {
    //     name: 'QQ',
    //     y: 1.2
    //   }, {
    //     name: 'Other',
    //     y: 2.61
    //   }]
    // }],
    accessibility: {
      enabled: true
    }
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
        plotBackgroundColor: 'silver',
        plotBorderWidth: 2,
        plotShadow: true,
        type: 'pie'
      },
      title: {
        text: ''
      },
      tooltip: {
        pointFormat: '{point.name}: <b>{point.percentage:.1f}%</b>'
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          // cursor: 'pointer',
          // dataLabels: {
          //   enabled: true,
          //   format: '<b>{point.name}</b>: {point.percentage:.1f} %'
          // }
        }
      },
      series: [{
        name: 'Brands',
        colorByPoint: true,
        type: undefined,
        data: <any[]>this._series.map(_ => {
          console.log(_);
          
          return {
            name: _.name,
            y: _.data.reduce((a, b) => a + b, 0)
          }
        })
      }],
      accessibility: {
        enabled: true
      }
    };
  }

  highcharts = Highcharts;
}
