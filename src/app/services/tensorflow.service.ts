import { Injectable } from '@angular/core';
import * as tf from '@tensorflow/tfjs';

@Injectable({
  providedIn: 'root',
})
export class TensorflowService {
  private model: tf.LayersModel | null = null;

  async loadModel(modelPath: string): Promise<void> {
    try {
      this.model = await tf.loadLayersModel(modelPath);
    } catch (error) {
      console.error('Error al cargar el modelo:', error);
    }
  }

  async predict(canvas: HTMLCanvasElement): Promise<any> {
    if (!this.model) {
      throw new Error('El modelo no está cargado');
    }

    const tensor = tf.browser
      .fromPixels(canvas)
      .resizeBilinear([224, 224])
      .toFloat()
      .expandDims(0)
      .div(255.0);

    const prediction = this.model.predict(tensor) as tf.Tensor;
    const result = await prediction.data();
    tensor.dispose();

    return result;
  }
}
