// header.component.ts
import { Component/*, ViewChild*/ } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from '@/app/auth/login/login.component';
import { AuthService } from '@/app/services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  imports: [CommonModule, LoginComponent],
})

export class HeaderComponent {
  isLoggedIn: boolean = false;
  loginFormVisible: boolean = false;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    // Verificamos si el usuario está autenticado al inicializar el componente
    this.authService.isLoggedIn$().subscribe(isLoggedIn => {
      this.isLoggedIn = isLoggedIn;
    });
  }

  toggleLoginForm(): void {
    this.loginFormVisible = !this.loginFormVisible;
  }

  //@ViewChild(LoginComponent) loginComponent!: LoginComponent;

  logout(): void {
    this.isLoggedIn = false;
    this.authService.logout();
  }
}
