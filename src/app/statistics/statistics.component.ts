import { Component } from '@angular/core';
import Highcharts from 'highcharts';
import { HighchartsChartModule } from 'highcharts-angular';

@Component({
  selector: 'app-statistics',
  imports: [HighchartsChartModule],
  templateUrl: './statistics.component.html',
  styleUrl: './statistics.component.css',
})
export class StatisticsComponent {
  Highcharts: typeof Highcharts = Highcharts;

  chartOptions: Highcharts.Options = {
    chart: {
      type: 'pie',
      backgroundColor: '#f3f4f6',
    },
    title: {
      text: 'Complete Shapes Statistics',
    },
    tooltip: {
      pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>',
    },
    accessibility: {
      point: {
        valueSuffix: '%',
      },
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          enabled: true,
          format: '<b>{point.name}</b><br>{point.percentage:.1f} %',
          style: {
            textAlign: 'center',
            fontSize: '14px',
          },
        },
      },
    },
    series: [
      {
        type: 'pie',
        name: 'Porcentaje',
        data: [
          { name: 'Completed', y: 25 },
          { name: 'Incomplete', y: 15 },
        ],
      },
    ],
  };

  clearState(): void {
    localStorage.removeItem('state');
    alert('El estado ha sido eliminado del Local Storage.');
  }
}
