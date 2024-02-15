// src/app/app.module.ts
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { DataService } from './services/data.service';
// Other imports...

@NgModule({
  declarations: [
    // Your components...
  ],
  imports: [
    HttpClientModule,
    // Other modules...
  ],
  providers: [
    DataService
    // Other services...
  ],
  bootstrap: [
    // Your main component...
  ]
})
export class AppModule { }
