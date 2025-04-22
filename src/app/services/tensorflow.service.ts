import { Injectable } from '@angular/core';
import * as tf from '@tensorflow/tfjs';

@Injectable({
  providedIn: 'root'
})
export class TensorflowService {
  private model: tf.LayersModel | null = null;

  constructor() {}

  // Cargar el modelo TensorFlow
  async loadModel(modelPath: string): Promise<void> {
    try {
      this.model = await tf.loadLayersModel(modelPath);
      console.log('Modelo cargado correctamente');
    } catch (error) {
      console.error('Error al cargar el modelo:', error);
    }
  }

  // Procesar la imagen y hacer una predicción
  async predict(canvas: HTMLCanvasElement): Promise<any> {
    if (!this.model) {
      throw new Error('El modelo no está cargado');
    }

    // Convertir el canvas a un tensor
    const tensor = tf.browser.fromPixels(canvas)
      .resizeBilinear([224, 224]) // Ajustar el tamaño de la imagen al tamaño esperado por el modelo
      .toFloat()
      .expandDims(0) // Agregar una dimensión para el batch
      .div(255.0); // Normalizar los valores de los píxeles entre 0 y 1

    // Hacer la predicción
    const prediction = this.model.predict(tensor) as tf.Tensor;
    const result = await prediction.data(); // Obtener los resultados como un array
    tensor.dispose(); // Liberar memoria

    return result;
  }
}
