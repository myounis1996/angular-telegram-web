import {Component, HostListener, inject} from '@angular/core';
import {Router} from "@angular/router";
import {SidebarComponent} from "./sidebar/sidebar.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  isMobile = false;
  private router = inject(Router);

  constructor() {
    this.checkScreenSize();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.checkScreenSize();
  }

  private checkScreenSize() {
    this.isMobile = window.innerWidth < 992;
    this.updateRoutes();
  }

  private updateRoutes() {
    const routes = this.router.config;
    const mobileRouteIndex = routes.findIndex(route => route.path === '' && route.component === SidebarComponent);
    if (this.isMobile) {
      if (mobileRouteIndex === -1) routes.unshift({path: '', component: SidebarComponent});
    } else {
      if (mobileRouteIndex !== -1) routes.splice(mobileRouteIndex, 1);
    }
    this.router.resetConfig(routes);
  }
}
