import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../../services/data.service';
import { forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { FinancialEntity } from '../../models/FEntity.model';

@Component({
  selector: 'app-financial-entity',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './financial-entity.component.html',
  styleUrls: ['./financial-entity.component.css']
})
export class FinancialEntityComponent implements OnInit {
  financialEntities: FinancialEntity[] = [];

  constructor(private dataService: DataService) { }

  ngOnInit() {
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
  
        return financialEntities.map(entity => {
          const entityContributions = contributions.flatMap(contribution => {
            // Asumiendo que la estructura de las contribuciones ya está correctamente ajustada
            return contribution.contributions
              .filter((subContribution: any) => subContribution.financialEntityId === entity.financialEntityId)
              .map((subContribution: any) => {
                // Depuración: Imprime el userID que estás buscando
                console.log("Buscando usuario con ID:", subContribution.userId);
  
                const user = users.find(u => u.id === contribution.userId);
                // Depuración: Imprime el resultado de la búsqueda
                console.log("Usuario encontrado:", user ? `${user.name} (${user.id})` : "No encontrado");
  
                const promoter = promoters.find(p => p.id === subContribution.promoterId);
                return {
                  userName: user ? user.name : 'Usuario no encontrado',
                  promoterName: promoter ? promoter.name : 'Promotor no encontrado',
                  financialEntityName: entity.name,
                  date: subContribution.date,
                  total: subContribution.totalAmount,
                  // Asegúrate de que estás accediendo correctamente a monthlyContributions
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
        console.log('Entidades Financieras enriquecidas:', result);
        this.financialEntities = result;
      },
      error: (error) => console.error('Error loading financial entities and contributions', error),
    });
  }
}
