import { Component, OnInit } from '@angular/core';
import Highcharts from 'highcharts';
import { HighchartsChartModule } from 'highcharts-angular';
import { ThemeService } from '../services/theme.service';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { IdbService } from '../services/idb.service';

@Component({
  selector: 'app-statistics',
  imports: [HighchartsChartModule, TranslatePipe, CommonModule],
  templateUrl: './statistics.component.html',
  styleUrl: './statistics.component.css',
})
export class StatisticsComponent implements OnInit {
  Highcharts: typeof Highcharts = Highcharts;
  isDarkMode: boolean = false;
  isVisible: boolean = false;
  showDataModal: boolean = false;
  isTitleVisible: boolean = false;

  constructor(
    private themeService: ThemeService,
    private translate: TranslateService,
    private idbService: IdbService
  ) {}

  ngOnInit(): void {
    this.themeService.darkMode$.subscribe((isDarkMode) => {
      this.isDarkMode = isDarkMode;
      this.updateChartColors(isDarkMode);
    });
    this.loadChartData();
    setTimeout(() => {
      this.isVisible = true;
    }, 0);
    setTimeout(() => {
      this.isTitleVisible = true;
    }, 200);
  }

  updateChartColors(isDarkMode: boolean): void {
    this.chartOptions = {
      ...this.chartOptions,
      chart: {
        ...this.chartOptions.chart,
        backgroundColor: isDarkMode ? '#000000' : '#FFFFFF',
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
      const completed = Object.values(state).filter(
        (value) => value === true
      ).length;

      const response = await fetch('/assets/shapes.json');
      const shapes = await response.json();
      const totalShapes = shapes.length;
      const incomplete = totalShapes - completed;

      this.chartOptions = {
        ...this.chartOptions,
        series: [
          {
            type: 'pie',
            name: this.translate.instant('STA.PERCENTAGE'),
            data: [
              { name: this.translate.instant('STA.COMPLETED'), y: completed },
              { name: this.translate.instant('STA.INCOMPLETE'), y: incomplete },
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
      text: '', // Set to empty string to avoid showing the title
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
    this.showDataModal = true;
  }

  confirmDeleteData(): void {
    localStorage.removeItem('state');
    this.idbService.clearDatabase()
    this.loadChartData();
    window.location.href = window.location.href;
  }

  cancelDeleteData(): void {
    location.reload();
  }
}
