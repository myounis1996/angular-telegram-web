import {AfterViewInit, Component, ElementRef, EventEmitter, Output, ViewChild} from '@angular/core';
import {SimplebarAngularComponent} from "simplebar-angular";
import {NgbCarousel, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ImagePreviewModalComponent} from "../../Modals/image-preview-modal/image-preview-modal.component";

@Component({
  selector: 'app-chat-side',
  templateUrl: './chat-side.component.html',
  styleUrl: './chat-side.component.scss'
})
export class ChatSideComponent implements AfterViewInit {
  @ViewChild('sideScrollArea', {read: SimplebarAngularComponent}) sideScrollArea!: SimplebarAngularComponent;
  @ViewChild("navElement") navElement !: ElementRef;
  @ViewChild('carousel', {static: true}) carousel !: NgbCarousel
  categories = {
    MEDIA: 0,
    FILES: 1,
    LINKS: 2,
    GROUPS: 3,
    VOICE: 4
  }
  selectedCategoryId = this.categories.MEDIA;
  sliderShown = false;
  toggleDone = true;
  infoHeaderShown = false;

  requestedScroll = 0;
  images = ["1024x1024", "2048x800", "1920x1080", "1080x1920", "300x50"].map((n) => `/svg/${n}.svg`);

  @Output() collapseChange = new EventEmitter();

  constructor(private modalService: NgbModal) {
  }

  ngAfterViewInit() {
    const scrollElement = this.sideScrollArea.SimpleBar.getScrollElement();
    scrollElement.scrollTop = 1;
    scrollElement.addEventListener("scroll", (event: any) => {
      const scrollTop = event.target.scrollTop;
      if (scrollTop > 1 && !this.toggleDone) {
        event.target.scrollTo(0, 1);
        this.requestedScroll++;
        if (this.requestedScroll == 30) {
          this.toggleDone = true;
        }
      } else if (scrollTop === 0 && this.toggleDone) {
        this.toggleDone = false;
        this.requestedScroll = 0;
      }
      this.sliderShown = scrollTop === 0;
      if (this.carousel) {
        this.carousel.pause();
      }
      this.infoHeaderShown = this.navElement.nativeElement.getBoundingClientRect().top <= 56;
    })
  }

  previewImages(event: any) {
    const shouldPreview = event.offsetX > 64 && event.offsetX < 350;
    if (shouldPreview) {
      const previewModal = this.modalService.open(ImagePreviewModalComponent, {
        backdropClass: 'backdrop',
        modalDialogClass: "bg-transparent",
        windowClass: "hide-scrollbar overflow-hidden",
        centered: true,
        fullscreen: true
      });
      previewModal.componentInstance.images = this.images.map((e) => {
        return {media: e, type: "image/jpeg"}
      });
      previewModal.componentInstance.source = "profile";
      previewModal.componentInstance.current = parseInt(this.carousel.activeId);
    }
  }

  onBackClicked() {
    const scrollElement = this.sideScrollArea.SimpleBar.getScrollElement();
    scrollElement.scrollTop = 1;
  }

  toggleCollapse(status?: boolean) {
    this.collapseChange.emit(status);
  }

  onClickNavItem(cat: number) {
    this.selectedCategoryId = cat;
    this.toggleDone = true;
    this.navElement.nativeElement.scrollIntoView();
    this.sideScrollArea.SimpleBar.recalculate();
  }
}
