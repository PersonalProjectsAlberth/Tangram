import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shape-card',
  imports: [CommonModule, HttpClientModule],
  templateUrl: './shape-card.component.html',
  styleUrl: './shape-card.component.css'
})
export class ShapeCardComponent implements OnInit{
  shapes: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<any[]>('/assets/shapes.json').subscribe((data) => {
      this.shapes = data;
    });
  }
}
