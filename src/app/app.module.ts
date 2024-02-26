// app.module.ts
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from './shared/header/header.component';
import { MainComponent } from './components/main/main.component';
import { FooterComponent } from './shared/footer/footer.component';
import { LoginComponent } from './auth/login/login.component';
import { ComplaintFormComponent } from './complaint-form/complaint-form.component';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    // Otros componentes declarados aquí...
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    SharedModule,
    LoginComponent,
    ComplaintFormComponent,
    HeaderComponent,
    MainComponent,
    FooterComponent,
  ],
  exports: [ComplaintFormComponent, LoginComponent],
  bootstrap: []
})
export class AppModule { }
