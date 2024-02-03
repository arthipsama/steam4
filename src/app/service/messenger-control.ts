// messenger-control.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MessengerControlService {
  private showMessenger = new BehaviorSubject<boolean>(true);
  showMessenger$ = this.showMessenger.asObservable();

  toggleMessengerVisibility(value: boolean): void {
    this.showMessenger.next(value);
  }
}
