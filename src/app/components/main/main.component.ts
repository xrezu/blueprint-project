import { Component } from '@angular/core';
import { ChatComponent } from '../../chat/chat.component'; // Asegúrate de ajustar la ruta de importación según tu estructura de proyecto

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [ChatComponent], 
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'] // Asegúrate de que la ruta y la extensión son correctas
})
export class MainComponent {
  isChatOpen: boolean = false;

  toggleChat(): void {
    this.isChatOpen = !this.isChatOpen;
  }
}
