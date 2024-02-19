// app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // Importante: Asegúrate de importar FormsModule aquí

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
    FormsModule, // Añade FormsModule a los imports
   
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
