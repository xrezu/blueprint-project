import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { FooterComponent } from './shared/footer/footer.component';


@NgModule({
  declarations: [
    AppComponent,
    FooterComponent
  ],
  imports: [
    AppComponent,
    BrowserModule
  ],
  providers: [],
  bootstrap: [
  ]
})
export class AppModule { }
