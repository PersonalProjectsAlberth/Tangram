import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../services/theme.service';
import { TensorflowService } from '../services/tensorflow.service';

@Component({
  selector: 'app-scan',
  imports: [CommonModule, HttpClientModule],
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
  isFirstShape: boolean = false;
  isLastShape: boolean = false;

  @ViewChild('canvasElement', { static: false })
  canvasElement!: ElementRef<HTMLCanvasElement>;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private themeService: ThemeService,
    private tfService: TensorflowService
  ) {}

  async ngOnInit(): Promise<void> {
    this.shapeId = this.route.snapshot.paramMap.get('id') || '';

    const state = JSON.parse(localStorage.getItem('state') || '{}');
    this.isShapeCompleted = state[this.shapeId] === true;

    await this.tfService.loadModel('/assets/my_model/model.json');

    this.http.get<any[]>('/assets/shapes.json').subscribe((data) => {
      const shape = data.find((item) => item.id === parseInt(this.shapeId, 10));
      this.shapePath = shape ? shape.path : null;

      const currentId = parseInt(this.shapeId, 10);
      this.isFirstShape = currentId === 1;
      this.isLastShape = currentId === data.length;
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
              this.predictionMessageG = '✅ La predicción es correcta';

              const state = JSON.parse(localStorage.getItem('state') || '{}');
              state[this.shapeId] = true;
              localStorage.setItem('state', JSON.stringify(state));
              this.isShapeCompleted = true;
            } else {
              this.predictionMessageB = '❌ La predicción es incorrecta';
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
    }
  }
  
  navigateToNext(): void {
    const nextId = Number(this.shapeId) + 1;
    this.routeToShape(nextId);
  }
  
  private routeToShape(shapeId: number): void {
    window.location.href = `/shape/${shapeId}`;
  }
}
