import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '@/app/services/data.service';
import { forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { FinancialEntity } from '@/app/models/FEntity.model';

@Component({
  selector: 'app-financial-entity',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './financial-entity.component.html',
  styleUrls: ['./financial-entity.component.css']
})
export class FinancialEntityComponent implements OnInit {
  userId: string | null = null;

  financialEntities: FinancialEntity[] = [];

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.userId = sessionStorage.getItem('userId');

    this.loadFinancialEntities();
  }
  
  loadFinancialEntities(): void {
    forkJoin({
      promoters: this.dataService.getPromoters(),
      contributionsObj: this.dataService.getContributions(),
      financialEntitiesObj: this.dataService.getFinancialEntities(),
      users: this.dataService.getUsers()
    })
    .pipe(
      map(({ promoters, contributionsObj, financialEntitiesObj, users }) => {
        // Depuración: Imprime la lista de usuarios cargados para verificar sus IDs
        console.log("Usuarios cargados:", users.map(u => ({ id: u.id, name: u.name })));
  
        const contributions = contributionsObj.contributions;
        const financialEntities = financialEntitiesObj.financialEntities;
  
        // Primero, filtra para obtener solo la entidad financiera logueada basada en this.userId
        const filteredFinancialEntities = financialEntities.filter(entity => entity.financialEntityId === this.userId);
        console.log("Entidades financieras filtradas basadas en userId:", filteredFinancialEntities);
  
        return filteredFinancialEntities.map(entity => {
          const entityContributions = contributions.flatMap(contribution => {
            return contribution.contributions
              .filter(subContribution => subContribution.financialEntityId === entity.financialEntityId)
              .map(subContribution => {
                console.log("Buscando usuario con ID:", subContribution.userId);
  
                const user = users.find(u => u.id === contribution.userId);
                console.log("Usuario encontrado:", user ? `${user.name} (${user.id})` : "No encontrado");
  
                const promoter = promoters.find(p => p.id === subContribution.promoterId);
                return {
                  userName: user ? user.name : 'Usuario no encontrado',
                  promoterName: promoter ? promoter.name : 'Promotor no encontrado',
                  financialEntityName: entity.name,
                  date: subContribution.date,
                  total: subContribution.totalAmount,
                  monthlyContributions: subContribution.monthlyContributions,
                };
              });
          });
  
          return {
            ...entity,
            contributions: entityContributions,
          };
        });
      })
    )
    .subscribe({
      next: (result) => {
        console.log('Entidades Financieras enriquecidas y filtradas:', result);
        this.financialEntities = result;
      },
      error: (error) => console.error('Error al cargar entidades financieras y contribuciones:', error),
    });
  }
  
}
