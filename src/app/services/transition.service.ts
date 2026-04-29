import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransitionService {
  private transitionStart = new Subject<string>();
  transitionStart$ = this.transitionStart.asObservable();

  triggerTransition(targetId: string) {
    this.transitionStart.next(targetId);
  }
}
