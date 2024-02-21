import { Component } from '@angular/core';
import { AuthService } from '@/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})

export class LoginComponent {
  username: string | undefined;
  password: string | undefined;
  errorMessage: string | undefined;

  constructor(private authService: AuthService) {}

  onLogin(): void {
    // No se han introducido datos en el login, por lo que saltará un mensaje de error
    if (!this.username || !this.password) {
      this.errorMessage = 'Por favor, introduzca sus datos';
      return;
    }

    this.authService.login(this.username, this.password).subscribe(user => {
      if (user) {
        // Usuario autenticado con éxito
        console.log('Login exitoso', user);
      } else {
        // Falló la autenticación
        this.errorMessage = 'Credenciales incorrectas';
      }
    });
  }
}
