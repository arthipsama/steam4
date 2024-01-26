// color.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ColorService {
  private backgroundColorSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');
  backgroundColor$: Observable<string> = this.backgroundColorSubject.asObservable();

  setBackgroundColor(color: string): void {
    this.backgroundColorSubject.next(color);
  }
}
