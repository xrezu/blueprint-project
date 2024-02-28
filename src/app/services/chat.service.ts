import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})

export class ChatService {
  private faqUrl = 'assets/json/faq.json';
  constructor(private http: HttpClient) {}

  getFaqs(): Observable<any[]> {
    return this.http.get<any[]>(this.faqUrl).pipe(
      catchError(error => {
        console.error('Error al cargar las FAQs:', error);
        return of([]); 
      })
    );
  }
}
