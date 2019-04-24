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
      dataqueima: '',
      horaqueima: '',
      aparelho: '',
      marca: '',
      modelo: '',
      tempouso: '',
      dataagendamento: '',
      antenaParabolica: [''],
      telefoneFixo: [''],
      estavaChovendo: [''],
      equipeTecnica: [''],
      outrasResidencias: [''],
      receberResposta: [''],
      receberRespostaTerceiros: [''],
      terceiro: ''
    });
  }

  private submitForm() {
    this.activeModal.close(this.myForm.value);
  }
}