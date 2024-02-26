import { Component } from '@angular/core';
import { HeaderComponent } from './shared/header/header.component';
import { MainComponent } from './components/main/main.component';
import { FooterComponent } from './shared/footer/footer.component';
import { CitizenComponent } from './components/citizen/citizen.component';
import { PromoterComponent } from './components/promoter/promoter.component';
import { FinancialEntityComponent } from './components/financial-entity/financial-entity.component';
import { AdminComponent } from './components/admin/admin.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    HeaderComponent,
    MainComponent,
    FooterComponent,
    CitizenComponent,
    PromoterComponent,
    FinancialEntityComponent,
    AdminComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
}


