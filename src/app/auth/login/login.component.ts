// login.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '@/app/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  //styleUrls: ['./login.component.css'],
  imports: [CommonModule],
})

export class LoginComponent {
  username: string | undefined;
  password: string | undefined;
  errorMessage: string | undefined;
  isLoggedIn: boolean = false;

  constructor(private authService: AuthService) {}

  onLogin(event: Event): void { // Usamos un evento para evitar que el formulario se envíe automáticamente
    event.preventDefault();
    // No se han introducido datos en el login, por lo que saltará un mensaje de error
    if (!this.username || !this.password) {
      this.errorMessage = 'Por favor, introduzca sus datos';
      return;
    }

    this.authService.login(this.username, this.password).subscribe(user => {
      if (user) {
        // Usuario autenticado con éxito
        console.log('Login exitoso');
        this.isLoggedIn = true;
      } else {
        // Se han introducido datos erroneos, por lo que saltará un mensaje de errorFalló la autenticación
        this.errorMessage = 'Credenciales incorrectas';
        this.password = '';
      }
    });
  }
}
