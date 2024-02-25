import { Component } from '@angular/core';
import { MainComponent } from './components/main/main.component';
import { FooterComponent } from './shared/footer/footer.component';
import { CitizenComponent } from './components/citizen/citizen.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MainComponent, CitizenComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Blueprint Proyect';
}


