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

  teamMembers: { name: string, githubProfile: string, profileImage: string }[] = [
    {
      name: 'Miguel Martínez',
      githubProfile: 'https://github.com/trikytrukos',
      profileImage: '../../../assets/images/profile-pics/miguel-pfp.jpg'
    },
    {
      name: 'Maksym Dovgan',
      githubProfile: 'https://github.com/xrezu',
      profileImage: '../../../assets/images/profile-pics/maksym-pfp.jpg'
    },
    {
      name: 'Álvaro Barasona',
      githubProfile: 'https://github.com/alvarobarasona',
      profileImage: '../../../assets/images/profile-pics/alvaro-pfp.jpg'
    },
    {
      name: 'Marcos Almorox',
      githubProfile: 'https://github.com/malmorox',
      profileImage: '../../../assets/images/profile-pics/marcos-pfp.jpg'
    },
    {
      name: 'Sergio Cáceres',
      githubProfile: 'https://github.com/Eracres',
      profileImage: '../../../assets/images/profile-pics/sergio-pfp.jpg'
    },
  ];
}
