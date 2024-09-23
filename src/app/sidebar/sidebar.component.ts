import {Component, ElementRef, Renderer2, ViewChild} from '@angular/core';
import {ToggleModeService} from "../services/toggle-mode.service";
import {ToggleAnimationService} from "../services/toggle-animation.service";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  menuOpened = false;
  searchFocused = false;
  searchPlaceholder = "Search"//"Reconnecting..."
  selectedFolderId = 0;
  selectedChatId = -1;
  @ViewChild('foldersElement', {static: false}) foldersElement: ElementRef<HTMLElement> = {} as ElementRef;
  @ViewChild('darkModeIcon') darkModeIcon!: ElementRef<HTMLElement>;

  constructor(protected toggleModeService: ToggleModeService, protected animationService: ToggleAnimationService, private renderer: Renderer2) {
    this.renderer.setAttribute(document.querySelector('html'), 'data-bs-theme', toggleModeService.currentModeValue);
  }

  OnSwitchAnimation(event: any) {
    this.animationService.currentStateValue = event.target.checked;
  }

  private _setTheme(theme: 'dark' | 'light') {
    this.toggleModeService.currentModeValue = theme;
    this.renderer.setAttribute(document.querySelector('html'), 'data-bs-theme', this.toggleModeService.currentModeValue);
  }

  onSwitchTheme(event: any) {
    const theme = event.target.checked ? 'dark' : 'light'
    if (this.animationService.currentStateValue) {
      const transition = (document as any).startViewTransition(() => {
        this._setTheme(theme)
      });
      const reverse = theme === "light";
      const rect = this.darkModeIcon.nativeElement.getBoundingClientRect();
      const {x, y} = {
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2
      };
      const endRadius = Math.hypot(
        Math.max(x, window.innerWidth - x),
        Math.max(y, window.innerHeight - y)
      );
      document.documentElement.classList.add('no-view-transition');
      document.documentElement.classList.toggle('reverse', reverse);

      transition.ready.then(() => {
        document.documentElement.animate({
          clipPath: [
            `circle(0 at ${x}px ${y}px)`,
            `circle(${endRadius}px at ${x}px ${y}px)`
          ]
        }, {
          duration: 500,
          easing: 'ease-in-out',
          pseudoElement: `::view-transition-${reverse ? 'old' : 'new'}(root)`,
          direction: reverse ? 'reverse' : 'normal'
        });
      });

      transition.finished.finally(() => {
        document.documentElement.classList.remove('no-view-transition', 'reverse');
      });
    } else {
      this._setTheme(theme)
    }
  }

  menuToggle(state: boolean) {
    this.menuOpened = state;
  }

  focus(focused: boolean) {
    this.searchFocused = focused;
  }

  onFolderScroll(e: any) {
    e.preventDefault()
    this.foldersElement.nativeElement.scroll(this.foldersElement.nativeElement.scrollLeft + e.deltaY / 4, 0);
  }
}
