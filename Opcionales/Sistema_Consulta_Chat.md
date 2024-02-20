# Sistema de consulta - chat

## 1- Preparar el Archivo JSON con Preguntas y Respuestas

Crea un archivo JSON en la carpeta src/assets/json llamado faq.json con la siguiente estructura:

```
[
  {
    "pregunta": "¿Cómo puedo cambiar mi contraseña?",
    "respuesta": "Para cambiar tu contraseña, ve a la configuración de tu perfil y selecciona 'Cambiar contraseña'."
  },
  {
    "pregunta": "¿Dónde puedo ver mi historial de transacciones?",
    "respuesta": "Tu historial de transacciones está disponible en la sección 'Transacciones' dentro de tu cuenta."
  },
  // Más preguntas y respuestas...
]
```

## 2- Crear el Servicio Chatbot

En la carpeta src/app/services, crea un servicio (chatbot.service.ts) que maneje la lógica para buscar en el archivo JSON la respuesta adecuada a las preguntas realizadas por el usuario.

```
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatbotService {
  private faqUrl = 'assets/json/faq.json';

  constructor(private http: HttpClient) {}

  obtenerFAQ(): Observable<any[]> {
    return this.http.get<any[]>(this.faqUrl);
  }

  buscarRespuesta(pregunta: string): Observable<string> {
    return this.obtenerFAQ().pipe(
      map(faqs => {
        const faq = faqs.find(f => pregunta.toLowerCase().includes(f.pregunta.toLowerCase()));
        return faq ? faq.respuesta : "Lo siento, no tengo información sobre eso.";
      })
    );
  }
}
```

## 3- Crear el Componente Chat

Usa Angular CLI para generar un nuevo componente llamado chat:

```
ng generate component views/chat
```

En tu componente chat.component.ts, inyectarás el servicio ChatbotService y agregarás la lógica para enviar preguntas y recibir respuestas.

```
import { Component } from '@angular/core';
import { ChatbotService } from '../../services/chatbot.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {
  pregunta: string = '';
  respuesta: string = '';

  constructor(private chatbotService: ChatbotService) {}

  enviarPregunta() {
    this.chatbotService.buscarRespuesta(this.pregunta).subscribe(
      respuesta => {
        this.respuesta = respuesta;
      }
    );
  }
}
```

## 4-  Crear la Interfaz del Chat

En tu archivo chat.component.html, crearás una interfaz de usuario sencilla para permitir al usuario hacer preguntas y ver respuestas.

```
<div class="chat-container">
  <input type="text" [(ngModel)]="pregunta" placeholder="Haz una pregunta...">
  <button (click)="enviarPregunta()">Enviar</button>
  <div *ngIf="respuesta" class="respuesta">
    {{ respuesta }}
  </div>
</div>
```

No olvides importar FormsModule en tu app.module.ts para utilizar ngModel.

