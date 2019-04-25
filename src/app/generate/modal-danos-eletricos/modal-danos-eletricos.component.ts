import { Component } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';

@Component({
  selector: 'ngbd-modal-confirm',
  templateUrl: `./modal-danos-eletricos.component.html`,
})
export class ModalDanosEletricos {
 
  myForm: FormGroup;
  constructor(public activeModal: NgbActiveModal, private formBuilder: FormBuilder) {
      this.createForm();
  }
  
  private createForm() {
    this.myForm = this.formBuilder.group({
      DATA_QUEIMA: '',
      HORA_QUEIMA: '',
      APARELHO: '',
      MARCA: '',
      MODELO: '',
      TEMPO_USO: '',
      DATA_AGENDAMENTO: '',
      ANTENA_PARABOLICA: [''],
      TELEFONE_FIXO: [''],
      ESTAVA_CHOVENDO: [''],
      HAVIA_EQUIPE: [''],
      OUTRA_RESIDENCIA: [''],
      SOLUCAO_PRETENDIDA: '',
      RECEBER_RESPOSTA: [''],
      AUTORIZOU_TERCEIROS: [''],
      TERCEIRO: ''
    });
  }

  private submitForm() {
    this.activeModal.close(this.myForm.value);
  }
}