import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface User {
  id: string;
  username: string;
  password: string;
  name: string;
  role: string;
  email: string;
}

interface Promoter {
  id: string;
  name: string;
  contactEmail: string;
}

interface FinancialEntity {
  id: string;
  name: string;
  contactEmail: string;
}

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>('/assets/data/users.json');
  }

  getPromoters(): Observable<Promoter[]> {
    return this.http.get<Promoter[]>('/assets/data/promoters.json');
  }

  getFinancialEntities(): Observable<FinancialEntity[]> {
    return this.http.get<FinancialEntity[]>('/assets/data/financialEntities.json');
  }
}
