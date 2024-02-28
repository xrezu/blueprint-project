// app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { ComplaintFormComponent } from './complaint-form/complaint-form.component';
// import { SharedModule } from './shared/shared.module';
import { HeaderComponent } from './shared/header/header.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    // SharedModule,
    ComplaintFormComponent,
    AuthModule
  ],
  exports: [ComplaintFormComponent, AppModule, HeaderComponent],
  bootstrap: []
})
export class AppModule { }
