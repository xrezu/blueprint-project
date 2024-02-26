import { Component } from '@angular/core';
import { AuthService } from '@/app/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  //styleUrls: ['./login.component.css'],
})

export class LoginComponent {
  username: string | undefined;
  password: string | undefined;
  errorMessage: string | undefined;
  isLoggedIn: boolean = false;

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
        this.isLoggedIn = true;
      } else {
        // Falló la autenticación
        this.errorMessage = 'Credenciales incorrectas';
      }
    });
  }
}
