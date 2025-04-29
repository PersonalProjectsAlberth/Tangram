import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class VibrationService {

  private vibrationSubject = new BehaviorSubject<boolean>(
    localStorage.getItem('vibration') === 'true'
  );
  vibration$ = this.vibrationSubject.asObservable();

  setVibration(isEnabled: boolean): void {
    localStorage.setItem('vibration', JSON.stringify(isEnabled));
    this.vibrationSubject.next(isEnabled);
    if (isEnabled === true) {
      navigator.vibrate(300);
    }
  }

  getVibration(): boolean {
    return this.vibrationSubject.value;
  }
}
