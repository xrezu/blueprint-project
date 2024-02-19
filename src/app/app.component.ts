import { Component } from '@angular/core';
import { RouterModule } from '@angular/router'; // Importa RouterModule si vas a usar <router-outlet>

import { HeaderComponent } from './shared/header/header.component';
import { MainComponent } from './components/main/main.component';
import { FooterComponent } from './shared/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    // Importa aquí tus componentes standalone y RouterModule si es necesario
    RouterModule, // Sólo si utilizas <router-outlet> en app.component.html
    HeaderComponent,
    MainComponent,
    FooterComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Tu Proyecto Angular';
}
