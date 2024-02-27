import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChatService } from '../services/chat.service'; 

@Component({
  selector: 'app-chat',
  standalone: true,
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
  providers: [ChatService]
})
export class ChatComponent implements OnInit {
  chatForm: FormGroup;
  messages: Array<{ message: string, sender: 'user' | 'bot' }> = [];
  isChatOpen: boolean = false;

  constructor(private fb: FormBuilder, private chatService: ChatService) {
    this.chatForm = this.fb.group({
      message: ['', Validators.required],
    });
  }

  ngOnInit(): void {
  }

  toggleChat(): void {
    this.isChatOpen = !this.isChatOpen;
  }

  onSubmit(): void {
    if (this.chatForm.valid) {
      const userMessage = this.chatForm.get('message')?.value;
      this.addMessage(userMessage, 'user');
      this.chatService.sendQuestion(userMessage).subscribe({
        next: (resp) => {
          this.addMessage(resp.respuesta, 'bot');
        },
        error: (error) => {
          console.error('Error al obtener respuesta del chatbot:', error);
        }
      });

      this.chatForm.reset();
    }
  }

  private addMessage(message: string, sender: 'user' | 'bot'): void {
    this.messages.push({ message, sender });
  }
}
