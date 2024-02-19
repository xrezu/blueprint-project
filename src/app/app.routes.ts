import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { AdminComponent } from './components/admin/admin.component';
import { PromoterComponent } from "./components/promoter/promoter.component";
import { CitizenComponent } from "./components/citizen/citizen.component";
import { FinancialEntityComponent } from "./components/financial-entity/financial-entity.component";

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'promoter', component: PromoterComponent },
  { path: 'citizen', component: CitizenComponent },
  { path: 'financial-entity', component: FinancialEntityComponent },
  // Redirige a login por defecto
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {}
