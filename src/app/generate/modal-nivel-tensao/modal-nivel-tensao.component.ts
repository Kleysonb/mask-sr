import { Component } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';

@Component({
  selector: 'ngbd-modal-confirm',
  templateUrl: `./modal-nivel-tensao.component.html`,
})
export class ModalNivelTensao {
  
  myForm: FormGroup;
  constructor(public activeModal: NgbActiveModal, private formBuilder: FormBuilder){
    this.createForm();
  }
  
  private createForm() {
    this.myForm = this.formBuilder.group({
      horaProblema: '',
      houveAcrescimo: [''],
      lampadasQueimam: [''],
      lampadasPiscam: [''],
      lampadasFracas: [''],
      autoDesligam: [''],
      problemaVizinhos: [''],
      vizinhoUtiliza: [''],
      energiaOscilando: [''],
      semEnergia: [''],
      pontoReferencia: [''],
      solucao: '',
      receberResposta: '',
      receberRespostaTerceiros: '',
      terceiro: ''
    });
  }

  private submitForm() {
    this.activeModal.close(this.myForm.value);
  }
}