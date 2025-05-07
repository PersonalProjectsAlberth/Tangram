import { Injectable } from '@angular/core';
import { openDB, IDBPDatabase } from 'idb';

interface Photo {
  id: string;
  image: string;
}

@Injectable({
  providedIn: 'root',
})
export class IdbService {
  private dbPromise: Promise<IDBPDatabase>;

  constructor() {
    this.dbPromise = this.initDB();
  }

  private async initDB(): Promise<IDBPDatabase> {
    return openDB('PhotoDB', 1, {
      upgrade(db) {
        if (!db.objectStoreNames.contains('photos')) {
          db.createObjectStore('photos', { keyPath: 'id' });
        }
      },
    });
  }

  // Guarda una foto en IndexedDB
  async savePhoto(id: string, image: string): Promise<void> {
    const db = await this.dbPromise;
    await db.put('photos', { id, image });
  }

  // Obtiene una foto de IndexedDB
  async getPhoto(id: string): Promise<Photo | undefined> {
    const db = await this.dbPromise;
    return db.get('photos', id);
  }

  // Elimina una foto de IndexedDB
  async deletePhoto(id: string): Promise<void> {
    const db = await this.dbPromise;
    await db.delete('photos', id);
  }

  // Obtiene todas las fotos de IndexedDB
  async getAllPhotos(): Promise<Photo[]> {
    const db = await this.dbPromise;
    return db.getAll('photos');
  }

  // Borra toda la base de datos IndexedDB
  async clearDatabase(): Promise<void> {
    const dbName = 'PhotoDB';
    await indexedDB.deleteDatabase(dbName);
  }
}
