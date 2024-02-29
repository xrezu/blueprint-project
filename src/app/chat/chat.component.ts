import { Component, OnInit } from '@angular/core';
import { ChatService } from '../services/chat.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule], // Importa CommonModule para usar directivas como *ngFor y *ngIf
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
  providers: [ChatService]
})
export class ChatComponent implements OnInit {
  messages: Array<{ message: string, sender: 'user' | 'bot' }> = [];
  isChatOpen: boolean = false;
  preguntasFrecuentes: string[] = []; // Se inicializa vacío y se llenará con las preguntas del JSON

  constructor(private chatService: ChatService) {}
  showFaqs: boolean = false;

  toggleFaqs(): void {
    this.showFaqs = !this.showFaqs;
  }

  ngOnInit(): void {
    this.loadFaqs(); 
  }

  toggleChat(): void {
    this.isChatOpen = !this.isChatOpen;
  }

  loadFaqs(): void {
    this.chatService.getFaqs().subscribe(faqs => {
      this.preguntasFrecuentes = faqs.map(faq => faq.pregunta);
    });
  }

  sendQuestion(pregunta: string): void {
    this.chatService.getFaqs().subscribe(faqs => {
      const faq = faqs.find(f => f.pregunta === pregunta);
      if (faq) {
        this.addMessage(pregunta, 'user');
        this.addMessage(faq.respuesta, 'bot');
      } else {
        this.addMessage('Pregunta no encontrada.', 'bot');
      }
    });
  }

  private addMessage(message: string, sender: 'user' | 'bot'): void {
    this.messages.push({ message, sender });
  }
}
