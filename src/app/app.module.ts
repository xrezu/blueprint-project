// app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { ComplaintFormComponent } from './complaint-form/complaint-form.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    LoginComponent,
    
    // Otros componentes declarados aquí...
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ComplaintFormComponent,
    HttpClientModule,
    AppComponent
  ],
  exports: [ComplaintFormComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
