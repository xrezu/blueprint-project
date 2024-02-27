import { Component,OnInit } from '@angular/core';
import { ChatComponent } from '../../chat/chat.component'; // Asegúrate de ajustar la ruta de importación según tu estructura de proyecto
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [ChatComponent,CommonModule], 
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'] // Asegúrate de que la ruta y la extensión son correctas
})
export class MainComponent implements OnInit {
  isChatOpen: boolean = false;

  constructor() {}

  ngOnInit(): void {}

  toggleChat(): void {
    this.isChatOpen = !this.isChatOpen;
  }
}
