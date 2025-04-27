import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FastAccessService {
  private fastAccessSubject = new BehaviorSubject<boolean>(
    localStorage.getItem('fastAccess') === 'true'
  );
  fastAccess$ = this.fastAccessSubject.asObservable();

  setFastAccess(isEnabled: boolean): void {
    localStorage.setItem('fastAccess', JSON.stringify(isEnabled));
    this.fastAccessSubject.next(isEnabled);
  }

  getFastAccess(): boolean {
    return this.fastAccessSubject.value;
  }
}
