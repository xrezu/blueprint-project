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
          if (user && user.token) {
            // Almacenar los detalles del usuario y el token jwt en sessionStorage
            sessionStorage.setItem('currentUser', JSON.stringify(user));
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

  isLoggedIn(): boolean {
    // Verificar si hay un usuario actual almacenado en sessionStorage
    return !!this.getCurrentUser();
  }

  // Función para cerrar sesión
  logout(): void {
    sessionStorage.removeItem('currentUser');
  }
}
