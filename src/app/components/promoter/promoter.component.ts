import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../../services/data.service';
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
  promoters: Promoter[] = []; 
  promoterContributions: { contributions: any; id: string; name: string; contactEmail: string; }[] | undefined;

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.loadPromoters();
  }

  loadPromoters(): void {
    forkJoin({
      promoters: this.dataService.getPromoters(),
      contributionsObj: this.dataService.getContributions(),
      financialEntitiesObj: this.dataService.getFinancialEntities(),
      users: this.dataService.getUsers() // Cambiado a usersObj para claridad
    })
    .pipe(
      map(({ promoters, contributionsObj, financialEntitiesObj, users }) => {
        const contributions = contributionsObj.contributions;
        const financialEntities = financialEntitiesObj.financialEntities;
        
        return promoters.map(promoter => {
          const promoterContributions = contributions.flatMap(contribution => {
            return contribution.contributions
              .filter(subContribution => subContribution.promoterId === promoter.id)
              .map(subContribution => {
                const user = users.find(u => {
                  return u.id === contribution.userId;
                });
                
                const financialEntityName = financialEntities.find(fe => {
                  return fe.financialEntityId === subContribution.financialEntityId;
                })?.name;
                
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
        console.log('Final result:', result);
        this.promoterContributions = result;
      },
      error: (error) => console.error('Error loading promoters and contributions', error),
    });
  }

}