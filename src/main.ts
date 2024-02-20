import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { HttpClientModule } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';

bootstrapApplication(AppComponent,{
  providers: [
    importProvidersFrom(HttpClientModule)
    // Lista aquí cualquier proveedor global que tu aplicación requiera,
    // por ejemplo, si usas servicios que dependen de HttpClient, necesitarás HttpClientModule
  ]
});

