import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { AppComponent } from './app.component';
import { ComplaintFormComponent } from './complaint-form/complaint-form.component';

@NgModule({
  declarations: [
    AppComponent,
    ComplaintFormComponent,
    // Declara otros componentes aquí
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatDialogModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
