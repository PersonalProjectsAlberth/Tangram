import { Component, OnInit } from '@angular/core';
import Highcharts from 'highcharts';
import { HighchartsChartModule } from 'highcharts-angular';
import { ThemeService } from '../services/theme.service';

@Component({
  selector: 'app-statistics',
  imports: [HighchartsChartModule],
  templateUrl: './statistics.component.html',
  styleUrl: './statistics.component.css',
})
export class StatisticsComponent implements OnInit {
  Highcharts: typeof Highcharts = Highcharts;

  constructor(private themeService: ThemeService) {}

  ngOnInit(): void {
    this.themeService.darkMode$.subscribe((isDarkMode) => {
      this.updateChartColors(isDarkMode);
    });
    this.loadChartData();
  }

  updateChartColors(isDarkMode: boolean): void {
    this.chartOptions = {
      ...this.chartOptions,
      chart: {
        ...this.chartOptions.chart,
        backgroundColor: isDarkMode ? '#000000' : '#f3f4f6',
      },
      title: {
        ...this.chartOptions.title,
        style: {
          ...this.chartOptions.title?.style,
          color: isDarkMode ? '#FFFFFF' : '#000000',
        },
      },
    };
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
    colors: ['#4CAF50', '#FF5722'],
    title: {
      text: 'Complete Shapes Statistics',
      style: {
        color: '#000000',
        fontSize: '20px',
        textAlign: 'center',
      },
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
          format: '<b>{point.name} ({point.y})</b><br>{point.percentage:.1f} %',
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
    credits: {
      enabled: false,
    },
  };

  clearState(): void {
    const confirmation = confirm('Are you sure you want to delete your progress? This action cannot be undone.');
    if (confirmation) {
      localStorage.removeItem('state');
      this.loadChartData();
    }
  }
}
