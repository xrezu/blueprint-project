import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../../services/data.service';
import { forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { Promoter } from '@/app/models/promoter.model';
@Component({
  selector: 'app-promoter',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './promoter.component.html',
  styleUrl: './promoter.component.css'
})
export class PromoterComponent implements OnInit {
  promoters: Promoter[] = []; 
  promoterContributions: { contributions: any; id: string; name: string; contactEmail: string; }[] | undefined;

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.loadPromoters();
  }

  loadPromoters(): void {
    forkJoin({
      promoters: this.dataService.getPromoters(),
      contributions: this.dataService.getContributions(),
      financialEntitiesResponse: this.dataService.getFinancialEntities(),
    })
    .pipe(
      map(({ promoters, contributions, financialEntitiesResponse }) => {
        // Aquí aseguramos acceder al array dentro del objeto financialEntitiesResponse
        const financialEntities = financialEntitiesResponse.financialEntities;

        return promoters.map(promoter => ({
          ...promoter,
          contributions: contributions.flatMap(contribution => 
            contribution.contributions
              .filter((subContribution: { promoterId: string; }) => subContribution.promoterId === promoter.id)
              .map((subContribution: { financialEntityId: any; monthlyContributions: any; }) => {
                // Encuentra el nombre de la entidad financiera directamente en el array financialEntities
                const financialEntityName = financialEntities.find((fe: any) => fe.financialEntityId === subContribution.financialEntityId)?.name;
                return {
                  userId: contribution.userId,
                  financialEntityName, // Añadimos el nombre de la entidad financiera aquí
                  monthlyContributions: subContribution.monthlyContributions
                };
              })
          )
        }));
      })
    )
    .subscribe({
      next: (result) => {
        this.promoterContributions = result;
      },
      error: (error) => console.error('Error loading promoters and contributions', error)
    });
  }
}