import { Component, Input, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-area-charts',
  templateUrl: './area-charts.component.html',
  styleUrls: ['./area-charts.component.scss'],
})
export class AreaChartsComponent implements OnInit {
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
  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: Highcharts.Options = {
    chart: {
      type: 'area'
    },
    title: {
      text: ''
    },
    xAxis: {
      allowDecimals: false,
      // accessibility: {
      //   rangeDescription: 'Range: 1940 to 2017.'
      // }
    },
    yAxis: {
      title: {
        text: ''
      },
    },
    tooltip: {
      pointFormat: '{series.name}  <b>{point.y:,.0f}</b><br/>{point.x}'
    },
    plotOptions: {
      area: {
        pointStart: 0,
        marker: {
          enabled: false,
          symbol: 'circle',
          radius: 2,
          states: {
            hover: {
              enabled: true
            }
          }
        }
      }
    },
    series: <any[]> this._series.map(_=>{
      return {
        name : _.name,
        data : _.data
      }
    })
  };
  constructor() { }

  ngOnInit() {
  }

  init(){
    this.chartOptions = {
      chart: {
        type: 'area'
      },
      title: {
        text: ''
      },
      xAxis: {
        allowDecimals: false,
      },
      yAxis: {
        title: {
          text: ''
        },
      },
      tooltip: {
        pointFormat: '{series.name} <b>{point.y:,.0f}</b><br/>{point.x}'
      },
      plotOptions: {
        area: {
          pointStart: 0,
          marker: {
            enabled: false,
            symbol: 'circle',
            radius: 2,
            states: {
              hover: {
                enabled: true
              }
            }
          }
        }
      },
      series: this._series
    };
  }
  
  highcharts = Highcharts;
}
