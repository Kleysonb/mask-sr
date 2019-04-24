import { Component } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'ngbd-modal-confirm',
  templateUrl: `./modal-danos-eletricos.component.html`,
})
export class ModalDanosEletricos {
  constructor(public modal: NgbActiveModal) {}
}