import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { MainComponent } from './components/main/main.component';
import { AdminComponent } from './components/admin/admin.component';
import { CitizenComponent } from './components/citizen/citizen.component';
import { PromoterComponent } from './components/promoter/promoter.component';
import { FinancialEntityComponent } from './components/financial-entity/financial-entity.component';
import { AuthService } from './services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    FooterComponent,
    MainComponent,
    AdminComponent,
    CitizenComponent,
    PromoterComponent,
    FinancialEntityComponent
  ], 
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  userRole: string | null = null;
  isLoggedIn: boolean = false;
  private authSubscription: Subscription = new Subscription();

  constructor(private authService: AuthService) {}

  ngOnInit() {
<<<<<<< HEAD
=======
    // this.isLoggedIn = true;
    // this.userRole = 'financialEntity';

>>>>>>> 0daa1d41d224b10d229ff5dbe8532a5bf167a5d5
    this.authSubscription = this.authService.isLoggedIn$().subscribe(isLoggedIn => {
      this.isLoggedIn = isLoggedIn;
      this.userRole = isLoggedIn ? this.authService.getUserRole() : null;
    });
  }

  ngOnDestroy() {
    this.authSubscription.unsubscribe();
  }
}
