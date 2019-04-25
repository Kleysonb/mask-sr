import { Component } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';

@Component({
  selector: 'ngbd-modal-confirm',
  templateUrl: `./modal-nivel-tensao.component.html`,
})
export class ModalNivelTensao {

  myForm: FormGroup;
  constructor(public activeModal: NgbActiveModal, private formBuilder: FormBuilder) {
    this.createForm();
  }

  private createForm() {
    this.myForm = this.formBuilder.group({
      HORARIO_PROBLEMA: '',
      ACRESCIMO_CARGA: [''],
      LAMPADAS_QUEIMAM: [''],
      LAMPADAS_PISCAM: [''],
      LAMPADAS_FRACAS: [''],
      AUTO_DESLIGAM: [''],
      PROBLEMA_VIZINHOS: [''],
      VIZINHO_UTILIZA: [''],
      ENERGIA_OSCILANDO: [''],
      SEM_ENERGIA: [''],
      PONTO_REFERENCIA: [''],
      SOLUCAO_PRETENDIDA: '',
      RECEBER_RESPOSTA: '',
      AUTORIZOU_TERCEIROS: '',
      TERCEIRO: ''
    });
  }

  private submitForm() {
    this.activeModal.close(this.myForm.value);
  }
}