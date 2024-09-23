import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ToggleModeService} from "./services/toggle-mode.service";
import ChatBackgroundGradientRenderer from "./services/gradientRenderer";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements AfterViewInit {
  lightColors = "#dbddbb,#6ba587,#d5d88d,#88b884";
  darkColors = "#fec496,#dd6cb9,#962fbf,#4f5bd5"
  @ViewChild("background") background!: ElementRef<HTMLDivElement>;
  @ViewChild("patternCanvas") patternCanvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild("gradientCanvas") gradientCanvas!: ElementRef<HTMLCanvasElement>;

  constructor(protected toggleModeService: ToggleModeService) {
  }

  ngAfterViewInit(): void {
    this.toggleModeService.currentMode$.subscribe((value) => {
      const colors = value === 'dark' ? this.darkColors : this.lightColors;
      this.gradientCanvas.nativeElement.setAttribute("data-colors", colors)
      this.changeBackground()
    });
  }

  changeBackground() {
    this.gradientCanvas.nativeElement.width = this.background.nativeElement.offsetWidth;
    this.gradientCanvas.nativeElement.height = this.background.nativeElement.offsetHeight;
    ChatBackgroundGradientRenderer.create(this.gradientCanvas.nativeElement);
    this.patternCanvas.nativeElement.width = this.gradientCanvas.nativeElement.width;
    this.patternCanvas.nativeElement.height = this.gradientCanvas.nativeElement.height;
    const ctx = this.patternCanvas.nativeElement.getContext("2d");
    const img = new Image();
    img.onload = () => {
      let imageWidth = img.width, imageHeight = img.height;
      const patternHeight = (500 + window.innerHeight / 2.5);
      const ratio = patternHeight / imageHeight;
      imageHeight = patternHeight;
      imageWidth *= ratio;
      if (ctx !== null) {
        if (this.toggleModeService.currentModeValue === 'dark') {
          ctx.fillStyle = '#000';
          ctx.fillRect(0, 0, this.patternCanvas.nativeElement.width, this.patternCanvas.nativeElement.height);
          ctx.globalCompositeOperation = 'destination-out';
        } else {
          ctx.globalCompositeOperation = 'source-over';
          ctx.globalAlpha = 0.1;
        }
        const draw = (y: number) => {
          for (let x = 0; x < this.patternCanvas.nativeElement.width; x += imageWidth)
            ctx.drawImage(img, x, y, imageWidth, imageHeight);
        };
        const centerY = (this.patternCanvas.nativeElement.height - imageHeight) / 2;
        draw(centerY);
        if (centerY > 0) {
          let topY = centerY;
          do {
            draw(topY -= imageHeight);
          } while (topY >= 0);
        }
        const endY = this.patternCanvas.nativeElement.height - 1;
        for (let bottomY = centerY + imageHeight; bottomY < endY; bottomY += imageHeight) {
          draw(bottomY);
        }

      }
    }
    img.src = "pattern.svg"
  }
}
