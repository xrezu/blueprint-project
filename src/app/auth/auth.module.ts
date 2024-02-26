import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // Importa si tu LoginComponent usa formularios
import { AuthService } from '../services/auth.service'; // Importa si tu LoginComponent necesita el servicio AuthService
@NgModule({
  declarations: [
    LoginComponent // Declara LoginComponent aquí
    // Puedes declarar otros componentes relacionados con la autenticación si los tienes
  ],
  imports: [
    CommonModule,
    FormsModule, // Asegúrate de importar FormsModule y/o ReactiveFormsModule si tu LoginComponent los utiliza
    ReactiveFormsModule
  ],
  providers: [
    AuthService // Provee AuthService en el nivel de este módulo si solo se usará aquí
  ]
})
export class AuthModule {}
