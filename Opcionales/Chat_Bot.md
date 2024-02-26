# ChatBol Opcional (Alternativa)

## app.component.html

```
<div class="chatbot-container">
  <div class="chatbot-header">
    <h2>Asistente Bancario Virtual</h2>
  </div>
  <div class="chatbot-messages" *ngIf="selectedOption == null">
    <p>¡Hola! Soy tu asistente virtual bancario y estoy aquí para ayudarte con tus consultas y operaciones bancarias.</p>
    <p>Recuerda que, para mantener la seguridad de tus datos, no debo manejar información personal sensible como tu NIP o número de cuenta en este chat. Si necesitas ayuda con temas específicos, por favor visita nuestra sucursal más cercana o contáctanos a través de los canales oficiales.</p>
    <p>Selecciona una de las siguientes opciones o escribe tu consulta para comenzar:</p>
    <div class="chatbot-options">
      <button *ngFor="let option of chatOptions" (click)="handleOptionClick(option)">
        {{ option.text }}
      </button>
    </div>
  </div>
  <div class="chatbot-messages" *ngIf="selectedOption != null">
    <p>{{ selectedOption.response }}</p>
    <button (click)="resetChat()">Volver</button>
  </div>
  <div class="chatbot-input">
    <input type="text" placeholder="Escribe un mensaje..." #chatInput>
    <button (click)="sendMessage(chatInput.value)">Enviar</button>
  </div>
</div>

```

## app.component.ts

```
import { Component } from '@angular/core';

@Component({
  selector: 'app-chatbot',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  selectedOption: any = null;
  chatOptions = [
    { text: 'Consultar saldo', response: 'Puedes consultar tu saldo en la opción de "Mis cuentas" en nuestra app o página web.' },
    { text: 'Reportar tarjeta perdida', response: 'Para reportar una tarjeta perdida, por favor llama inmediatamente a nuestro servicio al cliente o usa la opción de reporte en nuestra app.' },
    { text: 'Información de préstamos', response: 'Ofrecemos diversos tipos de préstamos. Te puedo proporcionar información general o puedes comunicarte con un asesor para más detalles.' },
    { text: 'Ayuda con la app', response: 'Si tienes problemas con nuestra app bancaria, te puedo ayudar con las preguntas frecuentes o dirigirte con soporte técnico.' },
  ];

  handleOptionClick(option: any): void {
    this.selectedOption = option;
  }

  resetChat(): void {
    this.selectedOption = null;
  }

  sendMessage(message: string): void {
    // Aquí se agregaría la lógica para manejar el envío de mensajes
    console.log(message);
  }
}
```

## app.component.css

```
.chatbot-container {
  width: 300px;
  border: 1px solid #ccc;
  border-radius: 5px;
  overflow: hidden;
  font-family: 'Arial', sans-serif;
}

.chatbot-header {
  background-color: #000;
  color: #fff;
  padding: 10px;
  text-align: center;
}

.chatbot-messages {
  padding: 10px;
  height: 300px;
  overflow-y: auto;
}

.chatbot-options button {
  display: block;
  width: 100%;
  padding: 10px;
  border: none;
  background-color: #f1f1f1;
  text-align: left;
  cursor: pointer;
  border-bottom: 1px solid #ccc;
}

.chatbot-options button:hover {
  background-color: #e7e7e7;
}

.chatbot-input {
  display: flex;
  border-top: 1px solid #ccc;
}

.chatbot-input input {
  flex-grow: 1;
  padding: 10px;
  border: none;
  border-radius: 0;
}

.chatbot-input button {
  padding: 10px;
  background-color: #4CAF50;
  color: white;
  border: none;
}

```
