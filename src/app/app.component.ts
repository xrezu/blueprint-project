// app.component.ts
import { Component } from '@angular/core';
//import { HeaderComponent } from './shared/header/header.component';
//import { MainComponent } from './components/main/main.component';
//import { FooterComponent } from './shared/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    HeaderComponent,
    MainComponent,
    FooterComponent,
    CitizenComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  //imports: [HeaderComponent, MainComponent, FooterComponent]
})

export class AppComponent {
  title = 'Blueprint Proyect';
}
