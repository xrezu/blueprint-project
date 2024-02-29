// login.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '@/app/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  //styleUrls: ['./login.component.css'],
  imports: [CommonModule, FormsModule],
})

export class LoginComponent {
  username: string = '';
  password: string = '';
  // errorMessage y inputFocused tienen que ver con los mensajes de error que se muestran en el formulario
  errorMessage: string | undefined;
  inputFocused: boolean = false;
  isLoggedIn: boolean = false;

  onInputFocus(): void {
    this.inputFocused = true;
  }

  constructor(private authService: AuthService) {}

  validateForm(event: Event): void {
    event.preventDefault();
    // No se han introducido datos en el login, por lo que saltará un mensaje de error
    if (!this.username.trim() || !this.password.trim()) {
      this.errorMessage = 'Introduzca sus datos';
      this.inputFocused = false;
      //return;
    } else {
      this.onLogin(event);
    }
  }

  onLogin(event: Event): void { // Usamos un evento para evitar que el formulario se envíe automáticamente
    event.preventDefault();

    this.authService.login(this.username, this.password).subscribe(
      user => {
        if (user) {
          // Usuario autenticado con éxito
          console.log('Login exitoso');
          this.isLoggedIn = true;
          //console.log(user);
        } else {
          // Se han introducido datos erroneos, por lo que saltará un mensaje de errorFalló la autenticación
          this.errorMessage = 'Credenciales incorrectas';
          this.password = '';
          this.inputFocused = false;
        }
      }, 
      error => {
        console.error('Error al iniciar sesión:', error.error);
        this.errorMessage = error.error.error || 'Error interno del servidor';
        this.inputFocused = false;
      }
    );
  }
}
