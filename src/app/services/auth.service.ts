// auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  constructor(private http: HttpClient) {}

  // Función para iniciar sesión
  login(username: string, password: string): Observable<User> {
    return this.http.post<User>('/api/login', {username, password})
      .pipe(
        map(user => {
          if (user && user.username && user.role) {
            // Almacenar el nombre de usuario y el rol en sessionStorage
            const currentUser = { username: user.username, role: user.role };
            sessionStorage.setItem('currentUser', JSON.stringify(currentUser));
        }
          return user;
        })
      );
  }

  // Obtenemos el usuario actual almacenado en sessionStorage
  getCurrentUser(): User | null {
    const userJSON = sessionStorage.getItem('currentUser');
    return userJSON ? JSON.parse(userJSON) : null;
  }

  // Verificamos si hay un usuario actual almacenado en sessionStorage
  isLoggedIn(): boolean {
    return !!this.getCurrentUser();
  }

  // Función para cerrar sesión
  logout(): void {
    sessionStorage.removeItem('currentUser');
  }
}
