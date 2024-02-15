import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private users: User[] = [
    {
      id: '1',
      username: 'admin',
      password: 'adminpass',
      name: 'Admin User',
      role: 'admin',
      email: 'admin@example.com'
    },
    // ...otros usuarios
  ];

  constructor() {}

  login(username: string, password: string): Observable<User | undefined> {
    const user = this.users.find(u => u.username === username && u.password === password);
    return of(user); 
  }
}
