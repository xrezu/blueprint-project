// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private usersUrl = 'assets/data/users.json'; // Ruta al archivo JSON
  private currentUser$: Observable<User | null>;

  constructor(private http: HttpClient) {
    this.currentUser$ = of(JSON.parse(localStorage.getItem('currentUser') || 'null'));
  }

  login(username: string, password: string): Observable<User | undefined> {
    return this.http.get<User[]>(this.usersUrl).pipe(
      map(users => {
        const user = users.find(u => u.username === username && u.password === password);
        if (user) {
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUser$ = of(user); // Actualiza el observable del usuario actual
        }
        return user;
      })
    );
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    this.currentUser$ = of(null); // Actualiza el observable del usuario actual a null
  }

  register(user: User): Observable<User> {
    // Simula el registro de un nuevo usuario
    // En una implementación real, aquí añadirías el usuario a la base de datos y devolverías el resultado
    return of(user);
  }

  isAuthenticated(): Observable<boolean> {
    return this.currentUser$.pipe(map(user => !!user));
  }

  getCurrentUser(): Observable<User | null> {
    return this.currentUser$;
  }
}
