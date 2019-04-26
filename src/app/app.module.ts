import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { RegisterUserComponent } from './register/register-user.component';

import { GenerateMaskComponent } from './generate/generate-mask.component';
import { ModalBibComponent } from './generate/generate-mask.component';

import { ModalDanosEletricos } from './generate/modal-danos-eletricos/modal-danos-eletricos.component';
import { ModalNivelTensao } from './generate/modal-nivel-tensao/modal-nivel-tensao.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { RouterModule, Routes } from '@angular/router';

import {NgxMaskModule} from 'ngx-mask'
import { SelectDropDownModule } from 'ngx-select-dropdown'

const appRoutes: Routes = [
  { path: '', component: RegisterUserComponent },
  { path: 'register', component: RegisterUserComponent },
  { path: 'mask', component: GenerateMaskComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(appRoutes),
  BrowserModule, FormsModule, NgbModule, ReactiveFormsModule, NgxMaskModule.forRoot(),
  SelectDropDownModule],
  declarations: [ AppComponent, RegisterUserComponent, GenerateMaskComponent, ModalDanosEletricos, ModalNivelTensao, ModalBibComponent ],
  bootstrap: [ AppComponent ],
  entryComponents: [ModalDanosEletricos, ModalNivelTensao, ModalBibComponent]
})
export class AppModule { }
