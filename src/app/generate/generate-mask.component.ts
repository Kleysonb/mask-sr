import dataInfo from './data/informacao.json'
import dataComplaint from './data/reclamacao.json';
import dataOrder from './data/pedido.json';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Component, Input, ElementRef, ViewChild } from '@angular/core';
import {Observable} from 'rxjs';
import {debounceTime, distinctUntilChanged, map} from 'rxjs/operators';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalDanosEletricos } from './modal-danos-eletricos/modal-danos-eletricos.component';
import { ModalNivelTensao } from './modal-nivel-tensao/modal-nivel-tensao.component';

const MODALS = {
  modalDanosEletricos: ModalDanosEletricos,
  modalNivelTensao: ModalNivelTensao
};

@Component({
  selector: 'generate-mask',
  templateUrl: `./generate-mask.component.html`,
  styleUrls: ['./generate-mask.component.css']
})
export class GenerateMaskComponent  {

  @ViewChild('info') inputInfo: ElementRef;  
  modelInfo: any = {};
  infoFocus = false;
  user;
  
  constructor(private _modalService: NgbModal, private formBuilder: FormBuilder){
    this.user = JSON.parse(localStorage.getItem("user"));
  }

  danosEletricos = "DANOS ELÉTRICOS";
  nivelTensao = "NIVEL DE TENSÃO";

  openModel(name: string) {
    const modalRef = this._modalService.open(MODALS[name]);
    modalRef.result.then((result) => {
      console.log(result);
    }).catch((error) => {
      console.log(error);
    });
  }

  searchInfo = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      map(term => 
        term.length < 1 ? []
        : dataInfo.informacao
        .filter(v => v.titulo.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10)
      )
  )

  formatterInfo = (x: {titulo: string}) => x.titulo;

  focusInfo = () => {
    this.infoFocus = false;
    this.orderFocus = true;
    this.complaintFocus = true;
    this.modelComplaint = {};
    this.modelOrder = {};
  }

  // --------------------------------------------------------------//

  modelOrder: any = {};
  orderFocus = true;
  searchOrder = (text$: Observable<string>) =>
      text$.pipe(
        debounceTime(200),
        map(term => 
          term.length < 1 ? []
          : dataOrder.pedido
          .filter(v => v.titulo.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10)
        )
    )

  formatterOrder = (x: {titulo: string}) => x.titulo;

  focusOrder = () => {
    this.infoFocus = true;
    this.orderFocus = false;
    this.complaintFocus = true;
    this.modelComplaint = {};
    this.modelInfo = {};
  }

  // --------------------------------------------------------------//

  modelComplaint: any = {};
  complaintFocus = true;
  searchComplaint = (text$: Observable<string>) =>
      text$.pipe(
        debounceTime(200),
        map(term => 
          term.length < 1 ? []
          : dataComplaint.reclamacao
          .filter(v => v.titulo.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10)
        )
    )

  selectedItem(item){
    console.log(item.item);
    switch(item.item.titulo){
      case this.nivelTensao:
        this.openModel('modalNivelTensao');
        break;
      case this.danosEletricos:
        this.openModel('modalDanosEletricos');
        break;
    }
  }

  formatterComplaint = (x: {titulo: string}) => x.titulo;

  focusComplaint = () => {
    this.infoFocus = true;
    this.orderFocus = true;
    this.modelInfo = {};
    this.modelOrder = {};
    this.complaintFocus = false;
  }

  //------------------------------------------------------//

  copy: string;
  subtitulo;

  generate(name, account, phone){
    if(this.modelInfo.descricao){
      // console.log("Info")
      this.copy = this.mask(this.modelInfo.descricao, name, account, phone);
      this.subtitulo = this.modelInfo.subtitulo;
    }

    if(this.modelOrder.descricao){
      //console.log("Order")
      this.copy = this.mask(this.modelOrder.descricao, name, account, phone);
      this.subtitulo = this.modelOrder.subtitulo;
    }

    if(this.modelComplaint.descricao){
      //console.log("Complaint")
      this.copy = this.mask(this.modelComplaint.descricao, name, account, phone);
      this.subtitulo = this.modelComplaint.subtitulo;
    }
  }

  mask(text, name, account, phone): string{    
    const nameDefault = "{$NOME_CLIENTE}";
    const accountDefault = "{$CONTA_CONTRATO}";
    const phoneDefault = "{$TELEFONE}";

    const tateUser = this.user.tate;
    const nameUser = this.user.name;

    let textReplace = text
      .replace(nameDefault, name)
      .replace(accountDefault, account)
      .replace(phoneDefault, phone);

    textReplace += ("\n\n" + tateUser + " " + nameUser);
  
    return textReplace;
  }

  clear(name, account, phone){
    name.value = "";
    account.value = "";
    phone.value = "";
    this.copy = "";
    this.subtitulo = "";
    this.modelInfo = {};
    this.modelOrder = {};
    this.modelComplaint = {};
  }

   copyInputMessage(inputElement){
    inputElement.select();
    document.execCommand('copy');
    inputElement.setSelectionRange(0, 0);
  }

}
