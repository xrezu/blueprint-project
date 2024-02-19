import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';

import { LoginComponent } from './auth/login/login.component';
import { AdminComponent } from './components/admin/admin.component';
import { PromoterComponent } from './components/promoter/promoter.component';
import { CitizenComponent } from './components/citizen/citizen.component';
import { FinancialEntityComponent } from './components/financial-entity/financial-entity.component';

  const routes: Routes = [
    // Nota: La propiedad 'imports' en las rutas es utilizada para componentes standalone en Angular 14+
    { path: 'login', component: LoginComponent },
    { path: 'admin', component: AdminComponent },
    // Asegúrate de tener rutas únicas para cada tipo de usuario
    { path: 'promoter', component: PromoterComponent },
    { path: 'citizen', component: CitizenComponent },
    { path: 'financial-entity', component: FinancialEntityComponent },
    
    // Redirige a login por defecto
    { path: '', redirectTo: '/login', pathMatch: 'full' },
  ];

  @NgModule({
    imports: [
      BrowserModule,
      RouterModule.forRoot(routes), // Configura tus rutas aquí
    ],
    bootstrap: [AppComponent] // Bootstrap con AppComponent
  })
  export class AppModule { }