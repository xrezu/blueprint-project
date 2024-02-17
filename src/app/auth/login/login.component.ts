import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private authService: AuthService) {}

  onLogin(): void {
    this.authService.login(this.username, this.password).subscribe(user => {
      if (user) {
        // Usuario autenticado con éxito
        console.log('Login exitoso', user);
      } else {
        // Falló la autenticación
        console.error('Credenciales incorrectas');
      }
    });
  }
}
