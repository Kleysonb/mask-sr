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

@Component({
  selector: 'ngbd-modal-content',
  templateUrl: `./modal-bib.component.html`
})
export class ModalBibComponent {
  @Input() data;
  @Input() typeModal;

  constructor(public activeModal: NgbActiveModal) {}

  copy(item){
    item.select();
    document.execCommand('copy');
    item.setSelectionRange(0, 0);
  }
}

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

  openModalBib(typeModal, dataClient){
    const modalRef = this._modalService.open(ModalBibComponent);
    switch(typeModal){
      case 'info':
        modalRef.componentInstance.data = this.compileBib(dataInfo.informacao, dataClient);
        modalRef.componentInstance.typeModal = "Informação";
        break;
      case 'order':
        modalRef.componentInstance.data = this.compileBib(dataOrder.pedido, dataClient);
        modalRef.componentInstance.typeModal = "Pedido";
        break;
      case 'complaint':
        modalRef.componentInstance.data = this.compileBib(dataComplaint.reclamacao, dataClient);
        modalRef.componentInstance.typeModal = "Reclamação";
        break;
    }
  }

  compileBib(items: any, dataClient: any){
    let bib = [];
    let description;
    items.forEach( item => {
      description = this.mask(item.descricao, dataClient.name, dataClient.account, dataClient.phone, dataClient.reference_point);
      let newItem = {titulo: item.titulo, subtitulo: item.subtitulo, descricao: description}
      bib.push(newItem);
    });
    return bib;
  }

  constructor(private _modalService: NgbModal, private formBuilder: FormBuilder){
    this.user = JSON.parse(localStorage.getItem("user"));
  }

  danosEletricos = "DANOS ELÉTRICOS";
  nivelTensao = "NIVEL DE TENSÃO";

  openModalInput(typeModal: string, data) {
    const modalRef = this._modalService.open(MODALS[typeModal]);
    modalRef.result.then((dataModal) => {
      // console.log(dataModal);
      this.applyMaskModal(typeModal, dataModal, data);
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

  
  selectedItem(item, data){
    // console.log(item.item);
    // console.log(data)
    switch(item.item.titulo){
      case this.nivelTensao:
        this.openModalInput('modalNivelTensao', data);
        break;
      case this.danosEletricos:
        this.openModalInput('modalDanosEletricos', data);
        break;
    }
  }

  applyMaskModal(typeModal: string, dataModal, data){
    let maskTemp = this.mask(this.modelComplaint.descricao, data.name, data.account, data.phone);
    switch(typeModal){
      case 'modalNivelTensao':
        this.copy = this.maskNivelTensao(maskTemp, dataModal);
        break;
      case 'modalDanosEletricos':
      this.copy = this.maskDanosEletricos(maskTemp, dataModal);
        break;
    }
    this.subtitulo = this.modelComplaint.subtitulo;
  }

  maskDanosEletricos(text, dataModal): string{
    let maskDefault = {};
    maskDefault['DATA_QUEIMA'] = "{$DATA_QUEIMA}";
    maskDefault['HORA_QUEIMA'] = "{$HORA_QUEIMA}";
    maskDefault['APARELHO'] = "{$APARELHO}";
    maskDefault['MARCA'] = "{$MARCA}";
    maskDefault['MODELO'] = "{$MODELO}";
    maskDefault['TEMPO_USO'] = "{$TEMPO_USO}";
    maskDefault['DATA_AGENDAMENTO'] = "{$DATA_AGENDAMENTO}";
    maskDefault['ANTENA_PARABOLICA'] = "{$ANTENA_PARABOLICA}";
    maskDefault['TELEFONE_FIXO'] = "{$TELEFONE_FIXO}";
    maskDefault['ESTAVA_CHOVENDO'] = "{$ESTAVA_CHOVENDO}";
    maskDefault['HAVIA_EQUIPE'] = "{$HAVIA_EQUIPE}";
    maskDefault['OUTRA_RESIDENCIA'] = "{$OUTRA_RESIDENCIA}";
    maskDefault['SOLUCAO_PRETENDIDA'] = "{$SOLUCAO_PRETENDIDA}";
    maskDefault['RECEBER_RESPOSTA'] = "{$RECEBER_RESPOSTA}";
    maskDefault['AUTORIZOU_TERCEIROS'] = "{$AUTORIZOU_TERCEIROS}";
    maskDefault['TERCEIRO'] = "{$TERCEIRO}";

    dataModal['DATA_QUEIMA'] = this.convertDate(dataModal['DATA_QUEIMA']);
    dataModal['DATA_AGENDAMENTO'] = this.convertDate(dataModal['DATA_AGENDAMENTO']);
    let textReplace = text;
    for(let attribute in maskDefault){
      textReplace = textReplace.replace(maskDefault[attribute], dataModal[attribute]);
    }
    return textReplace;
  }

  convertDate(date): string {
    let arrayDate = date.split("-");
    let newDate = `${arrayDate[2]}/${arrayDate[1]}/${arrayDate[0]}`;
    return newDate;
  }

  maskNivelTensao(text, dataModal): string{
    let maskDefault = {};
    maskDefault['HORARIO_PROBLEMA'] = "{$HORARIO_PROBLEMA}";
    maskDefault['ACRESCIMO_CARGA'] = "{$ACRESCIMO_CARGA}";
    maskDefault['LAMPADAS_QUEIMAM'] = "{$LAMPADAS_QUEIMAM}";
    maskDefault['LAMPADAS_PISCAM'] = "{$LAMPADAS_PISCAM}";
    maskDefault['LAMPADAS_FRACAS'] = "{$LAMPADAS_FRACAS}";
    maskDefault['TEMPO_USO'] = "{$TEMPO_USO}";
    maskDefault['AUTO_DESLIGAM'] = "{$AUTO_DESLIGAM}";
    maskDefault['PROBLEMA_VIZINHOS'] = "{$PROBLEMA_VIZINHOS}";
    maskDefault['VIZINHO_UTILIZA'] = "{$VIZINHO_UTILIZA}";
    maskDefault['ENERGIA_OSCILANDO'] = "{$ENERGIA_OSCILANDO}";
    maskDefault['SEM_ENERGIA'] = "{$SEM_ENERGIA}";
    maskDefault['PONTO_REFERENCIA'] = "{$PONTO_REFERENCIA}";
    // maskDefault['SOLUCAO_PRETENDIDA'] = "{$SOLUCAO_PRETENDIDA}";
    // maskDefault['RECEBER_RESPOSTA'] = "{$RECEBER_RESPOSTA}";
    // maskDefault['AUTORIZOU_TERCEIROS'] = "{$AUTORIZOU_TERCEIROS}";
    // maskDefault['TERCEIRO'] = "{$TERCEIRO}";

    let textReplace = text;
    for(let attribute in maskDefault){
      textReplace = textReplace.replace(maskDefault[attribute], dataModal[attribute]);
    }
    return textReplace;
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

  generate(name, account, phone, reference_point){
    if(this.modelInfo.descricao){
      // console.log("Info")
      this.copy = this.mask(this.modelInfo.descricao, name, account, phone, reference_point);
      this.subtitulo = this.modelInfo.subtitulo;
    }else{
      if(this.modelOrder.descricao){
        //console.log("Order")
        this.copy = this.mask(this.modelOrder.descricao, name, account, phone, reference_point);
        this.subtitulo = this.modelOrder.subtitulo;
      }else{
        if(this.modelComplaint.descricao){
          //console.log("Complaint")
          this.copy = this.mask(this.modelComplaint.descricao, name, account, phone, reference_point);
          this.subtitulo = this.modelComplaint.subtitulo;
        }else{
          alert("Por favor, selecione uma consulta.")
        }
      }
    }
  }

  mask(text, name, account, phone, reference_point = ""): string{    
    const nameDefault = "{$NOME_CLIENTE}";
    const accountDefault = "{$CONTA_CONTRATO}";
    const phoneDefault = "{$TELEFONE}";
    const referencePointDefault = "{$PONTO_REFERENCIA}";

    const tateUser = this.user.tate;
    const nameUser = this.user.name;

    let textReplace = text
      .replace(nameDefault, name)
      .replace(accountDefault, account)
      .replace(phoneDefault, phone)
      .replace(referencePointDefault, reference_point);

    textReplace += (`${tateUser} ${nameUser}`);
  
    return textReplace.toUpperCase();
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
