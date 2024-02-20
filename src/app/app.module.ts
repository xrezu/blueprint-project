// app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
// Importaciones de otros componentes...

@NgModule({
  declarations: [
    LoginComponent,
    // Otros componentes declarados aquí...
  ],
  imports: [
    BrowserModule,
    FormsModule,

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
