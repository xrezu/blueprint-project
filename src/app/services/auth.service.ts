// auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private isLoggedInSubject: BehaviorSubject<boolean>;

  constructor(private http: HttpClient) {
    this.isLoggedInSubject = new BehaviorSubject<boolean>(this.isLoggedIn());
  }

  // Función para iniciar sesión
  login(username: string, password: string): Observable<User> {
    console.log("Intentando iniciar sesión con:", username, password);
    return this.http.post<User>('/api/login', { username, password })
      .pipe(
        map(user => {
          if (user && user.username && user.role) {
            //console.log("Usuario autenticado:", user);
            const currentUser = { id: user.id, username: user.username, role: user.role };
            sessionStorage.setItem('currentUser', JSON.stringify(currentUser));
            this.isLoggedInSubject.next(true);
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

  getUserRole(): string | null {
    const currentUser = this.getCurrentUser();
    //console.log("Rol del usuario obtenido:", currentUser?.role);
    return currentUser?.role || null;
  }

  // Verificamos si hay un usuario actual almacenado en sessionStorage
  isLoggedIn(): boolean {
    return !!this.getCurrentUser();
  }

  // Función para obtener el estado de autenticación y usarla en otros componentes para ver el estado en tiempo real
  isLoggedIn$(): Observable<boolean> {
    return this.isLoggedInSubject.asObservable();
  }

  // Función para cerrar sesión
  logout(): void {
    sessionStorage.removeItem('currentUser');
    this.isLoggedInSubject.next(false);
  }


}
