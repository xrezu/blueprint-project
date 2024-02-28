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
    return this.http.get<User[]>(`${this.apiUrl}/users`);
  }

  getContributions(): Observable<ContributionsResponse> {
    return this.http.get<ContributionsResponse>(`${this.apiUrl}/contributions`);
  }

  
  getPromoters(): Observable<Promoter[]> {
    return this.http.get<Promoter[]>(`${this.apiUrl}/promoter`);
  }

  getFinancialEntities(): Observable<{
    find(arg0: (e: any) => boolean): unknown; financialEntities: FinancialEntity[] 
}> {
    return this.http.get<{ financialEntities: FinancialEntity[] }>(`${this.apiUrl}/FEntity`);
}
}
