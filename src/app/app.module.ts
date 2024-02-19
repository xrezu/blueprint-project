import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';  
import { AdminComponent } from './admin/admin.component';
import { UserComponent } from './user/user.component';
import { FooterComponent } from './shared/footer/footer.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'user', component: UserComponent },
  // Redirige a login por defecto
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  // Agrega otras rutas aquí
];

@NgModule({
  
  declarations: [
  ],
  imports: [
    AppComponent,
    BrowserModule,
    FooterComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
