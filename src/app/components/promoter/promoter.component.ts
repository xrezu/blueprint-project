import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '@/app/services/data.service';
import { AuthService } from '@/app/services/auth.service';
import { forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { Promoter } from '@/app/models/promoter.model';
import { FinancialEntity } from '@/app/models/FEntity.model';
import { User } from '@/app/models/user.model';
@Component({
  selector: 'app-promoter',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './promoter.component.html',
  styleUrl: './promoter.component.css'
})
export class PromoterComponent implements OnInit {
  userId: string | null = null;
  promoters: Promoter[] = []; 
  promoterContributions: { contributions: any; id: string; name: string; contactEmail: string; }[] | undefined;

  constructor(private dataService: DataService, private authService: AuthService) {}

  ngOnInit() {
    const currentUser = this.authService.getCurrentUser();
    if (currentUser) {
      this.userId = currentUser.id.toString();
    }
    this.loadPromoters();
  }

  loadPromoters(): void {
    forkJoin({
      promoters: this.dataService.getPromoters(),
      contributionsObj: this.dataService.getContributions(),
      financialEntitiesObj: this.dataService.getFinancialEntities(),
      users: this.dataService.getUsers()
    })
    .pipe(
      map(({ promoters, contributionsObj, financialEntitiesObj, users }) => {
        // Filtrar para obtener solo el promotor logueado.
        const filteredPromoters = promoters.filter(promoter => promoter.id === this.userId);

        return filteredPromoters.map(promoter => {
          const promoterContributions = contributionsObj.contributions.flatMap(contribution => {
            return contribution.contributions
              .filter(subContribution => subContribution.promoterId === promoter.id)
              .map(subContribution => {
                const user = users.find(u => u.id === contribution.userId);
                const financialEntityName = financialEntitiesObj.financialEntities.find(fe => fe.financialEntityId === subContribution.financialEntityId)?.name;

                return {
                  userName: user ? user.name : 'Usuario no encontrado',
                  financialEntityName,
                  monthlyContributions: subContribution.monthlyContributions,
                };
              });
          });

          return {
            ...promoter,
            contributions: promoterContributions,
          };
        });
      })
    )
    .subscribe({
      next: (result) => {
        // Como ahora estamos filtrando por el promotor logueado, result debería contener solo la información para ese promotor.
        this.promoterContributions = result;
      },
      error: (error) => console.error('Error loading promoters and contributions', error),
    });
  }
}