import {AfterViewInit, Component, HostListener, ViewChild} from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {SelectionModel} from "@angular/cdk/collections";
import {DeleteMessageModalComponent} from "../Modals/delete-message-modal/delete-message-modal.component";
import {ForwardMessageModalComponent} from "../Modals/forward-message-modal/forward-message-modal.component";
import {ToggleAnimationService} from "../services/toggle-animation.service";
import {SimplebarAngularComponent} from "simplebar-angular";

@Component({
  selector: 'app-chat-window',
  templateUrl: './chat-window.component.html',
  styleUrl: './chat-window.component.scss'
})
export class ChatWindowComponent implements AfterViewInit {
  @ViewChild('chatScrollArea', {read: SimplebarAngularComponent}) chatScrollArea!: SimplebarAngularComponent;
  isCollapsed = true;
  messageSelection = new SelectionModel<any>(true, []);
  canScrollToBottom = false;
  isMobile = false;
  constructor(private modalService: NgbModal, private animationService: ToggleAnimationService) {
    this.messageSelection.select()
  }

  ngAfterViewInit() {
    const element = this.chatScrollArea.SimpleBar.getScrollElement()
    this.onScrollToEnd("instant");
    element.addEventListener("scroll", (event: any) => {
      const scrollTop = event.target.scrollTop;
      const bottom = element.scrollHeight - scrollTop - element.offsetHeight;
      this.canScrollToBottom = bottom > 300
    })
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkScreenSize();
  }

  checkScreenSize() {
    this.isMobile = window.innerWidth <= 992;
  }

  OnRightClick() {
  }

  openConfirm() {
    const confirmModal = this.modalService.open(DeleteMessageModalComponent, {
      size: "sm",
      backdropClass: 'forward-backdrop',
      centered: true,
      animation: this.animationService.currentStateValue,
    });
  }

  openForward() {
    const forwardModal = this.modalService.open(ForwardMessageModalComponent, {
      size: "md",
      backdropClass: 'forward-backdrop',
      modalDialogClass: "forward-dialog",
      animation: this.animationService.currentStateValue,
      centered: true
    });
  }

  onScrollToEnd(behavior = 'smooth') {
    this.chatScrollArea.SimpleBar.getScrollElement().scrollTo({
      top: this.chatScrollArea.SimpleBar.getScrollElement().scrollHeight,
      behavior: behavior
    });
  }
}
