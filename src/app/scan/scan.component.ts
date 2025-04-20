import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../services/theme.service';

@Component({
  selector: 'app-scan',
  imports: [CommonModule, HttpClientModule],
  templateUrl: './scan.component.html',
  styleUrls: ['./scan.component.css']
})
export class ScanComponent implements OnInit {

  isDarkMode = true;
  shapeId!: string;
  shapePath: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private themeService: ThemeService
  ) {}

  async ngOnInit(): Promise<void> {

    this.shapeId = this.route.snapshot.paramMap.get('id') || '';

    this.http.get<any[]>('/assets/shapes.json').subscribe((data) => {
      const shape = data.find((item) => item.id === parseInt(this.shapeId, 10));
      this.shapePath = shape ? shape.path : null;
    });

    this.themeService.darkMode$.subscribe((isDarkMode) => {
      this.isDarkMode = isDarkMode;
    });
  }
}