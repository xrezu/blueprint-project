import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private apiUrl = 'http://localhost:3000/faq'; 

  constructor(private http: HttpClient) { }

  sendQuestion(pregunta: string): Observable<any> {
    return this.http.post<any>(this.apiUrl, { pregunta });
  }
}
