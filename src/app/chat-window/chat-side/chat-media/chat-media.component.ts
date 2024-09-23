import {AfterViewInit, Component, EventEmitter, Output} from '@angular/core';
import {ImagePreviewModalComponent} from "../../../Modals/image-preview-modal/image-preview-modal.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-chat-media',
  templateUrl: './chat-media.component.html',
  styleUrl: './chat-media.component.scss'
})
export class ChatMediaComponent implements AfterViewInit {
  data: any = [
    {
      month: "June",
      media: [
        {id: 0, media: "/svg/32x32.svg", type: "image/svg"},
        {id: 1, media: "/svg/48x24.svg", type: "image/svg"},
        {id: 2, media: "/54x54.jpg", type: "image/jpg"},
        {id: 8, media: "/svg/64x16.svg", type: "image/svg"},
        {id: 7, media: "/video/test.mp4", type: "video/mp4"},
        {id: 9, media: "/svg/80x40.svg", type: "image/svg"},
        {id: 10, media: "/svg/90x160.svg", type: "image/svg"},
        {
          id: 99,
          media: "/video/test2.mp4",
          type: "video/mp4"
        },
      ]
    },
    {
      month: "May",
      media: [
        {id: 11, media: "/svg/128x512.svg", type: "image/svg"},
        {id: 21, media: "/svg/250x1000.svg", type: "image/svg"},
        {id: 31, media: "/svg/300x50.svg", type: "image/svg"},
        {id: 41, media: "/svg/512x128.svg", type: "image/svg"},
      ]
    },
    {
      month: "Apr",
      media: [
        {id: 12, media: "/svg/759x759.svg", type: "image/svg"},
        {id: 22, media: "/svg/987x432.svg", type: "image/svg"},
        {id: 32, media: "/svg/1024x1024.svg", type: "image/svg"},
        {id: 42, media: "/svg/1080x1920.svg", type: "image/svg"},
        {id: 52, media: "/svg/1234x567.svg", type: "image/svg"},
        {id: 62, media: "/svg/1920x1080.svg", type: "image/svg"},
        {id: 72, media: "/svg/2048x800.svg", type: "image/svg"},
      ]
    }
  ]
  isLoading = false;
  constructor(private modalService: NgbModal) {
  }

  ngAfterViewInit(): void {
  }

  openMediaViewer(id: number) {
    let images: any[] = [];
    for (let i = 0; i < this.data.length; i++) {
      images = images.concat(this.data[i].media)
    }
    const previewModal = this.modalService.open(ImagePreviewModalComponent, {
      backdropClass: 'backdrop',
      modalDialogClass: "bg-transparent ",
      windowClass: "hide-scrollbar overflow-hidden",
      centered: true,
      fullscreen: true
    });
    previewModal.componentInstance.images = images;
    previewModal.componentInstance.source = "media";
    previewModal.componentInstance.current = images.findIndex((obj) => obj.id === id);
  }
  onLoadMetaData(media: any, event: any) {
    media.duration = event.target.duration;
  }
  formatSecondsAsTime(seconds: number): string {
    return `${(Math.floor(seconds / 60))}:${(Math.floor(seconds % 60)).toString().padStart(2, '0')}`
  }
}
