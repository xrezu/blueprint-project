// app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { ComplaintFormComponent } from './complaint-form/complaint-form.component';
import { SharedModule } from './shared/shared.module';
import { HeaderComponent } from './shared/header/header.component';

@NgModule({
  declarations: [
  ],
  imports: [
    BrowserModule,
    FormsModule,
    SharedModule,
    ComplaintFormComponent,
  ],
  exports: [ComplaintFormComponent, ],
  bootstrap: []
})
export class AppModule { }
