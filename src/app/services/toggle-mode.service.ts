import { Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ToggleModeService {
  currentModeSubject: BehaviorSubject<"dark" | "light"> ;
  currentMode$: Observable<"dark" | "light"> ;

  get currentModeValue(): "dark" | "light" {
    return this.currentModeSubject.value;
  }

  set currentModeValue(mode: "dark" | "light") {
    this.currentModeSubject.next(mode);
    localStorage.setItem('mode', mode);
  }

  constructor() {
      const mode = localStorage.getItem('mode') === 'dark' ? "dark" : "light";
      this.currentModeSubject = new BehaviorSubject<"dark" | "light">(mode);
      this.currentMode$ = this.currentModeSubject.asObservable();
  }

}
