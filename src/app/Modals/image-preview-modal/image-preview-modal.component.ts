import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  Input,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import {NgbActiveModal, NgbDropdown, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {DeleteMessageModalComponent} from "../delete-message-modal/delete-message-modal.component";
import {CdkDrag, Point} from "@angular/cdk/drag-drop";
import {ForwardMessageModalComponent} from "../forward-message-modal/forward-message-modal.component";
import {ToggleAnimationService} from "../../services/toggle-animation.service";

@Component({
  selector: 'app-image-preview-modal',
  templateUrl: './image-preview-modal.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrl: './image-preview-modal.component.scss'
})
export class ImagePreviewModalComponent implements AfterViewInit {
  @Input() images: { media: string, type: string, message?: string }[] = [];
  @Input() current: number = 0;
  @Input() source: string = "profile";
  @ViewChild("videoElement") videoElement!: ElementRef<HTMLVideoElement>;
  @ViewChild("wrapper") wrapperElement!: CdkDrag;
  @ViewChild("imgRef") imgRefElement!: CdkDrag;
  @ViewChild("boundary") boundaryElement!: ElementRef<HTMLDivElement>;
  @ViewChild("rateDropDownElementRef") rateDropDownElement!: ElementRef<HTMLDivElement>;
  @ViewChild("rateDropDown") rateDropDown!: NgbDropdown;
  scale: number = 1;
  initialWidth = 100;
  initialHeight = 100;
  zoomEnabled = false;
  videoPaused = false;
  volume = 1;
  lastVolume = 0.5;
  isFullScreen = false;
  loadedPercentage = 0;
  filledPercentage = 0;
  isMouseDown = false;
  isMuted = false;
  videoCurrentTime = 0;
  videoDuration = 0;
  isLoadingVideo = true;
  rateDropdownOpened: boolean = false;
  dragPosition: Point = {x: 0, y: 0};
  boundaryWidth = window.innerWidth;
  boundaryHeight = window.innerHeight;
  boundaryLeftOffset = 0;
  boundaryTopOffset = 0;


  constructor(public modal: NgbActiveModal, private modalService: NgbModal, private animationService: ToggleAnimationService) {

  }

  calculateWidth() {
    const isImage = this.images[this.current].type.startsWith('image');
    if (isImage) {
      const element = new Image();
      element.onload = () => {
        const maxHeight = window.innerHeight - 240;
        const minHeight = 0.2 * window.innerHeight;
        const maxWidth = window.innerWidth - 240;
        this.initialWidth = element.width;
        this.initialHeight = element.height;
        if (element.height < minHeight) {
          this.initialWidth = minHeight * element.width / element.height;
          this.initialHeight = minHeight;
        } else if (element.height > maxHeight) {
          this.initialWidth = maxHeight * element.width / element.height;
          this.initialHeight = maxHeight;
        }
        if (element.width > maxWidth) {
          this.initialWidth = maxWidth;
          this.initialHeight = element.height * maxWidth / element.width;
        }
      }
      element.src = this.images[this.current].media;
    } else {
      this.initialWidth = 640;
      this.initialHeight = 360;
    }
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.calculateWidth();
    }, 0);
  }

  slide(to: number) {
    this.current = this.current + to;
    this.calculateWidth();
  }

  backDropClick() {
    this.modal.dismiss();
  }

  doZoom() {
    this.dragPosition = {x: 0, y: 0};
    this.zoomEnabled = !this.zoomEnabled;
    this.scale = this.zoomEnabled ? 1.5 : 1;
    if (this.zoomEnabled) this.setupBoundary();
  }

  setupBoundary() {
    if (this.initialWidth * this.scale > window.innerWidth) {
      this.boundaryLeftOffset = -(this.initialWidth * this.scale - window.innerWidth)
      this.boundaryWidth = (-this.boundaryLeftOffset) * 2 + window.innerWidth;
    } else {
      this.boundaryWidth = this.initialWidth * this.scale;
      this.boundaryLeftOffset = (window.innerWidth - this.boundaryWidth) / 2
    }
    if (this.initialHeight * this.scale > window.innerHeight) {
      this.boundaryTopOffset = -(this.initialHeight * this.scale - window.innerHeight)
      this.boundaryHeight = (-this.boundaryTopOffset) * 2 + window.innerHeight;
    } else {
      this.boundaryHeight = this.initialHeight * this.scale;
      this.boundaryTopOffset = (window.innerHeight - this.boundaryHeight) / 2
    }
  }

  onClickZoom(zoomFactor: number) {
    this.scale += zoomFactor;
    this.setupBoundary();
    if (zoomFactor < 0) {
      this.repositionInBoundary()
    }
  }

  repositionInBoundary() {
    setTimeout(() => {
      const currentElementRef = this.images[this.current].type.startsWith('image') ? this.imgRefElement : this.wrapperElement;
      let x = currentElementRef.getFreeDragPosition().x, y = currentElementRef.getFreeDragPosition().y;
      const bounds = currentElementRef.element.nativeElement.getBoundingClientRect();

      if (bounds.top > 0) {
        y = -this.boundaryTopOffset / 2;
      }
      if (bounds.left > 0) {
        x = -this.boundaryLeftOffset / 2;
      }

      if (bounds.top < this.boundaryTopOffset) {
        y = this.boundaryTopOffset / 2;
      }
      if (bounds.left < this.boundaryLeftOffset) {
        x = this.boundaryLeftOffset / 2;
      }

      if (this.initialHeight * this.scale < window.innerHeight) {
        y = 0;
      }
      if (this.initialWidth * this.scale < window.innerWidth) {
        x = 0;
      }
      this.dragPosition = {x, y}
    })
  }

  onInputZoom() {
    this.setupBoundary();
    this.repositionInBoundary()
  }

  openConfirm() {
    const confirmModal = this.modalService.open(DeleteMessageModalComponent, {
      size: "sm",
      backdropClass: 'bg-transparent',
      centered: true,
      animation: this.animationService.currentStateValue,
    });
  }

  openForward() {
    const forwardModal = this.modalService.open(ForwardMessageModalComponent, {
      size: "md",
      backdropClass: 'forward-backdrop',
      centered: true,
      animation: this.animationService.currentStateValue,
    });
  }

  togglePlay() {
    if (this.zoomEnabled) return;
    this.videoPaused ? this.videoElement.nativeElement.play() : this.videoElement.nativeElement.pause();
    this.videoPaused = this.videoElement.nativeElement.paused;
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    this.videoElement.nativeElement.muted = this.isMuted;
    if (this.isMuted) {
      this.lastVolume = this.volume;
      this.volume = 0;
    } else {
      this.volume = this.lastVolume;
    }
    this.videoElement.nativeElement.volume = this.isMuted ? this.volume : this.lastVolume;
  }

  async requestPIP() {
    const onLeavePIP = (event: any) => {
      setTimeout(() => {
        if (this.videoElement.nativeElement.paused)
          this.modal.close({reason: "PIP_CLOSE"});
        else
          this.modal.update({
            windowClass: "d-block",
            backdropClass: 'light-blue-backdrop',
          });
        this.videoElement.nativeElement.removeEventListener("leavepictureinpicture", onLeavePIP, false);
      }, 0)
    }
    await this.videoElement.nativeElement.requestPictureInPicture();
    // const pipWindow = await window.documentPictureInPicture.requestWindow({
    //   width: this.videoElement.nativeElement.clientWidth,
    //   height: this.videoElement.nativeElement.clientHeight,
    // });
    // pipWindow.document.body.append(this.videoElement.nativeElement);
    this.videoElement.nativeElement.addEventListener("leavepictureinpicture", onLeavePIP, {passive: true});
    this.modal.update({
      windowClass: "d-none",
      backdropClass: 'd-none backdrop',
    });
  }

  async toggleFullScreen() {
    if (this.zoomEnabled) return;
    this.isFullScreen = !this.isFullScreen;
    if (this.isFullScreen)
      await this.wrapperElement.element.nativeElement.requestFullscreen();
    else if (document.exitFullscreen)
      await document.exitFullscreen();
  }

  changeSpeed(playbackRate: number) {
    this.videoElement.nativeElement.playbackRate = playbackRate;
  }

  changeVolume(event: any) {
    this.videoElement.nativeElement.volume = this.volume = event.target.value;
    this.videoElement.nativeElement.muted = this.volume == 0;
    this.isMuted = this.volume == 0;
  }

  onProgressMouseDown(event: MouseEvent) {
    this.isMouseDown = true;
  }

  onProgressMouseMove(event: any) {
    if (!this.isMouseDown) return;
    this.filledPercentage = event.offsetX / (event.target.offsetWidth) * 100;
  }

  onProgressMouseUp(event: any) {
    this.isMouseDown = false;
    this.filledPercentage = event.offsetX / (event.target.offsetWidth) * 100;
    this.videoElement.nativeElement.currentTime = this.filledPercentage / 100 * this.videoElement.nativeElement.duration;
    this.videoCurrentTime = this.videoElement.nativeElement.currentTime;
  }

  onVideoTimeUpdate() {
    if (this.isMouseDown) return;
    this.filledPercentage = this.videoElement.nativeElement.currentTime / this.videoElement.nativeElement.duration * 100;
    this.videoCurrentTime = this.videoElement.nativeElement.currentTime;
  }

  onVideoProgress() {
    if (this.videoElement.nativeElement.buffered.length > 0) {
      const bufferedEnd = this.videoElement.nativeElement.buffered.end(this.videoElement.nativeElement.buffered.length - 1);
      const duration = this.videoElement.nativeElement.duration;
      if (duration > 0) {
        this.loadedPercentage = (bufferedEnd / duration) * 100;
      }
    }
  }

  formatSecondsAsTime(seconds: number): string {
    return `${(Math.floor(seconds / 60))}:${(Math.floor(seconds % 60)).toString().padStart(2, '0')}`
  }

  onLoadedMetadata() {
    this.videoDuration = this.videoElement.nativeElement.duration;
  };

  onChangeRateDropdown(opened: boolean) {
    this.rateDropdownOpened = opened;
  }

  @HostListener("mousemove", ['$event'])
  onMouseMove(event: any) {
    if (this.rateDropdownOpened) {
      const rect = this.rateDropDownElement.nativeElement.getBoundingClientRect();
      if (Math.abs(event.x - rect.x) > 200 || Math.abs(event.y - rect.y) > 200) {
        this.rateDropDown.close();
      }
    }
  }
}
