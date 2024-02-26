import { Component, ViewChild } from '@angular/core';
import { LoginComponent } from '@/app/auth/login/login.component';
import { AuthService } from '@/app/services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  imports: []
})

export class HeaderComponent {
  isLoggedIn: boolean = false;
  loginFormVisible: boolean = false;

  toggleLoginForm(): void {
    this.loginFormVisible = !this.loginFormVisible;
  }

  constructor(private authService: AuthService) {}

  @ViewChild(LoginComponent) loginComponent!: LoginComponent;

  logout(): void {
    this.isLoggedIn = false;
    this.authService.logout();
  }

}
