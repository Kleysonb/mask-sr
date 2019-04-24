import { Component } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'ngbd-modal-confirm',
  templateUrl: `./modal-nivel-tensao.component.html`,
})
export class ModalNivelTensao {
  constructor(public modal: NgbActiveModal) {}
}