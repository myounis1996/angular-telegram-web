import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-chat-header',
  templateUrl: './chat-header.component.html',
  styleUrl: './chat-header.component.scss'
})
export class ChatHeaderComponent {
  isMuted = false;
  dotsOpened = false;
  pinnedMessages = [];
  hasMedia= true;
  activePinnedIndex = 1;
  @Output() collapseChange = new EventEmitter();

  constructor() {
    this.pinnedMessages.length = 10;
  }

  toggleCollapse(status?: boolean) {
    this.collapseChange.emit(status);
  }

  goToNextPinned() {
    this.activePinnedIndex = this.activePinnedIndex === 0 ? this.pinnedMessages.length - 1 : this.activePinnedIndex - 1;
    // @ts-ignore
    document.getElementById(`pinned_${this.activePinnedIndex}`).scrollIntoView({block: "center"});
  }
}
