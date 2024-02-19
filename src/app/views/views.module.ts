// En tu archivo app.module.ts

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from '../app.component';
import { FooterComponent } from '../shared/footer/footer.component'; 
@NgModule({
  declarations: [
    AppComponent,
    FooterComponent 
  ],
  imports: [
    BrowserModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

