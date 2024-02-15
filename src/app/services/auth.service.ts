import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedInStatus = false;

  constructor(private http: HttpClient) {}

  // Función para verificar el estado de inicio de sesión del usuario
  get isLoggedIn() {
    return this.loggedInStatus;
  }

  // Función para iniciar sesión, ahora utilizando una llamada HTTP al backend
  login(username: string, password: string): Observable<User> {
    return this.http.post<User>('/api/login', {username, password})
      .pipe(
        map(user => {
          if (user && user.token) {
            // Almacenar los detalles del usuario y el token jwt en el almacenamiento local
            // para mantener al usuario conectado entre las recargas de la página
            localStorage.setItem('currentUser', JSON.stringify(user));
            this.loggedInStatus = true;
          }
          return user;
        })
      );
  }

  // Función para cerrar sesión
  logout(): void {
    // Eliminar el usuario del almacenamiento local para cerrar sesión
    localStorage.removeItem('currentUser');
    this.loggedInStatus = false;
  }

  // Función para registrar un nuevo usuario (añadir lógica correspondiente según el backend)
  register(user: User): Observable<User> {
    // Asumiendo que la API del backend tiene una ruta '/api/register' para el registro
    return this.http.post<User>('/api/register', user);
  }
}
