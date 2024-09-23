import {Component} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-delete-message-modal',
  templateUrl: './delete-message-modal.component.html',
  styleUrl: './delete-message-modal.component.scss'
})
export class DeleteMessageModalComponent {

  constructor(public modal: NgbActiveModal) {

  }

}
