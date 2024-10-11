import {Component, HostListener, inject} from '@angular/core';
import {NavigationEnd, Router} from "@angular/router";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  isMobile = false;
  hasChatOpened = false;
  router = inject(Router);
  selectedChatId = -1;

  constructor() {
    this.checkScreenSize();
    this.checkActivatedRoutePath();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkScreenSize();
  }

  checkScreenSize() {
    this.isMobile = window.innerWidth <= 992;
  }

  private checkActivatedRoutePath() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.hasChatOpened = event.url !== '/';
        this.selectedChatId = parseInt(event.url.split('/')[1]) || -1;
      }
    });
  }
}
