import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { RegisterUserComponent } from './register/register-user.component';

import { GenerateMaskComponent } from './generate/generate-mask.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { RouterModule, Routes } from '@angular/router';

const appRoutes: Routes = [
  { path: '', component: RegisterUserComponent },
  { path: 'register', component: RegisterUserComponent },
  { path: 'mask', component: GenerateMaskComponent },
];

@NgModule({
  imports:      [ RouterModule.forRoot(
      appRoutes,
    ),
    BrowserModule, FormsModule, NgbModule],
  declarations: [ AppComponent, RegisterUserComponent, GenerateMaskComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
