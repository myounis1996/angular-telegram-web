import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ToggleAnimationService {
  currentStateSubject: BehaviorSubject<boolean> ;
  currentState$: Observable<boolean> ;

  get currentStateValue(): boolean {
    return this.currentStateSubject.value;
  }

  set currentStateValue(state: boolean) {
    this.currentStateSubject.next(state);
    localStorage.setItem('animation', String(state));
  }

  constructor() {
    const state = localStorage.getItem('animation') === 'true';
    this.currentStateSubject = new BehaviorSubject<boolean>(state);
    this.currentState$ = this.currentStateSubject.asObservable();
  }
}
