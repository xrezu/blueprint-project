import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ContributionsResponse } from '../models/contributions.interface'; 
import { Promoter } from '../models/promoter.model'; 
import { FinancialEntity } from '../models/FEntity.model'; 


interface User {
  id: string;
  username: string;
  password: string;
  name: string;
  role: string;
  email: string;
}





@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }
  private apiUrl = 'http://localhost:3000';

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>('/assets/data/users.json');
  }

  getContributions(): Observable<ContributionsResponse> {
    return this.http.get<ContributionsResponse>(`${this.apiUrl}/citizen`);
  }

  
  getPromoters(): Observable<Promoter[]> {
    return this.http.get<Promoter[]>(`${this.apiUrl}/promoter`);
  }

  getFinancialEntities(): Observable<FinancialEntity[]> {
    return this.http.get<FinancialEntity[]>(`${this.apiUrl}/FEntity`);
  }
}
