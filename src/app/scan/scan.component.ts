import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../services/theme.service';
import { TensorflowService } from '../services/tensorflow.service';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-scan',
  imports: [CommonModule, HttpClientModule, TranslatePipe],
  templateUrl: './scan.component.html',
  styleUrls: ['./scan.component.css'],
})
export class ScanComponent implements OnInit {
  isDarkMode = true;
  shapeId!: string;
  shapePath: string | null = null;
  isCameraActive: boolean = false;
  predictionMessageG: string = '';
  predictionMessageB: string = '';
  isShapeCompleted: boolean = false;
  totalShapes: number = 0;
  private touchStartX: number = 0;
  private touchEndX: number = 0;

  @ViewChild('canvasElement', { static: false })
  canvasElement!: ElementRef<HTMLCanvasElement>;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private themeService: ThemeService,
    private tfService: TensorflowService,
    private translate: TranslateService
  ) {}

  async ngOnInit(): Promise<void> {
    this.shapeId = this.route.snapshot.paramMap.get('id') || '';

    const state = JSON.parse(localStorage.getItem('state') || '{}');
    this.isShapeCompleted = state[this.shapeId] === true;

    await this.tfService.loadModel('/assets/my_model/model.json');

    this.http.get<any[]>('/assets/shapes.json').subscribe((data) => {
      const shape = data.find((item) => item.id === parseInt(this.shapeId, 10));
      this.shapePath = shape ? shape.path : null;

      this.totalShapes = data.length;
    });

    this.themeService.darkMode$.subscribe((isDarkMode) => {
      this.isDarkMode = isDarkMode;
    });
  }

  async handlePhotoCapture(event: Event): Promise<void> {
    this.predictionMessageG = '';
    this.predictionMessageB = '';
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const selectedFile = input.files[0];

      this.isCameraActive = true;

      setTimeout(async () => {
        const canvas = this.canvasElement?.nativeElement;
        if (!canvas) {
          console.error('El canvas no está disponible en el DOM.');
          return;
        }

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          console.error('No se pudo obtener el contexto 2D del canvas.');
          return;
        }

        const imageUrl = URL.createObjectURL(selectedFile);
        const img = new Image();
        img.onload = async () => {
          const aspectRatio = img.width / img.height;
          const maxWidth = 300;
          const maxHeight = 300;

          if (aspectRatio > 1) {
            canvas.width = maxWidth;
            canvas.height = maxWidth / aspectRatio;
          } else {
            canvas.height = maxHeight;
            canvas.width = maxHeight * aspectRatio;
          }

          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

          try {
            const prediction = await this.tfService.predict(canvas);
            const predictionreuslt = Array.from(prediction) as number[];
            const maxValue = Math.max(...predictionreuslt);
            const maxIndex = predictionreuslt.indexOf(maxValue);

            if (maxIndex + 1 === Number(this.shapeId)) {
              this.predictionMessageG = this.translate.instant('SCA.CORRECT')

              const state = JSON.parse(localStorage.getItem('state') || '{}');
              state[this.shapeId] = true;
              localStorage.setItem('state', JSON.stringify(state));
              this.isShapeCompleted = true;
              
              if (navigator.vibrate) {
                navigator.vibrate(200);
              }

            } else {
              this.predictionMessageB = this.translate.instant('SCA.INCORRECT')

              if (navigator.vibrate) {
                navigator.vibrate([100, 50, 100]);
              }

            }
          } catch (error) {
            console.error('Error al hacer la predicción:', error);
          }

          URL.revokeObjectURL(imageUrl);
        };
        img.src = imageUrl;
      }, 10);
    }
  }

  navigateToPrevious(): void {
    const previousId = Number(this.shapeId) - 1;
    if (previousId > 0) {
      this.routeToShape(previousId);
    } else {
      this.routeToShape(this.totalShapes);
    }
  }

  navigateToNext(): void {
    const nextId = Number(this.shapeId) + 1;
    if (nextId <= this.totalShapes) {
      this.routeToShape(nextId);
    } else {
      this.routeToShape(1);
    }
  }

  private routeToShape(shapeId: number): void {
    window.location.href = `/shape/${shapeId}`;
  }

  onTouchStart(event: TouchEvent): void {
    this.touchStartX = event.changedTouches[0].screenX;
  }

  onTouchEnd(event: TouchEvent): void {
    this.touchEndX = event.changedTouches[0].screenX;
    this.handleSwipeGesture();
  }

  private handleSwipeGesture(): void {
    const swipeThreshold = 50;
    if (this.touchEndX < this.touchStartX - swipeThreshold) {
      this.navigateToNext();
    } else if (this.touchEndX > this.touchStartX + swipeThreshold) {
      this.navigateToPrevious();
    }
  }
}
