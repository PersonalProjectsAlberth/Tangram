import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ThemeService } from '../services/theme.service';

@Component({
  selector: 'app-shape-card',
  imports: [CommonModule, HttpClientModule],
  templateUrl: './shape-card.component.html',
  styleUrl: './shape-card.component.css'
})
export class ShapeCardComponent implements OnInit{

  isDarkMode = true;
  shapes: any[] = [];

  constructor(
    private http: HttpClient,
  private themeService: ThemeService
) {}

  ngOnInit(): void {
    this.http.get<any[]>('/assets/shapes.json').subscribe((data) => {
      this.shapes = data;
    });

    this.themeService.darkMode$.subscribe((isDarkMode) => {
      this.isDarkMode = isDarkMode;
    });
  }

  private _router = inject(Router);

  navegate(id: number) {
    this._router.navigate(['/shape', id]);
  }
}
