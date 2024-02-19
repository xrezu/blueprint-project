import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { AdminComponent } from './admin/admin.component';
import { FooterComponent } from './shared/footer/footer.component';
import { PromoterComponent } from './promoter/promoter.component';
import { CitizenComponent } from './citizen/citizen.component';
import { FinantialEntityComponent } from './finantial-entity/finantial-entity.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'user', component: PromoterComponent },
  { path: 'user', component: CitizenComponent },
  { path: 'user', component: FinantialEntityComponent },


  
  // Redirige a login por defecto
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  // Agrega otras rutas aquí
];

// ...
@NgModule({

  declarations: [
    AppComponent,
    FooterComponent
  ],
  imports: [
    AppComponent,
    BrowserModule
  ],
  providers: [],
  bootstrap: [
  ]
})
export class AppModule { 
  constructor() {
    bootstrapApplication(AppComponent);
  }
}
