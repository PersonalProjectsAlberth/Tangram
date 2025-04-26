import { Component, OnInit } from '@angular/core';
import Highcharts from 'highcharts';
import { HighchartsChartModule } from 'highcharts-angular';

@Component({
  selector: 'app-statistics',
  imports: [HighchartsChartModule],
  templateUrl: './statistics.component.html',
  styleUrl: './statistics.component.css',
})
export class StatisticsComponent implements OnInit {
  Highcharts: typeof Highcharts = Highcharts;

  ngOnInit(): void {
    this.loadChartData();
  }

  async loadChartData(): Promise<void> {
    try {
      const state = JSON.parse(localStorage.getItem('state') || '{}');
      const completed = Object.values(state).filter((value) => value === true).length;
  
      const response = await fetch('/assets/shapes.json');
      const shapes = await response.json();
      const totalShapes = shapes.length;
      const incomplete = totalShapes - completed;
  
      this.chartOptions = {
        ...this.chartOptions,
        series: [
          {
            type: 'pie',
            name: 'Porcentaje',
            data: [
              { name: 'Completed', y: completed },
              { name: 'Incomplete', y: incomplete },
            ],
          },
        ],
      };
    } catch (error) {
      console.error('Error loading chart data:', error);
    }
  }  

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
        data: [],
      },
    ],
  };

  clearState(): void {
    const confirmation = confirm('Are you sure you want to delete your progress? This action cannot be undone.');
    if (confirmation) {
      localStorage.removeItem('state');
      this.loadChartData();
    }
  }
}
