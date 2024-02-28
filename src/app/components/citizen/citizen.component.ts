import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../../services/data.service';
import { UserContribution } from '../../models/contributions.interface';
import { Promoter } from '../../models/promoter.model';
import { FinancialEntity } from '../../models/FEntity.model';
import { forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-citizen',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './citizen.component.html',
  styleUrls: ['./citizen.component.css'],
})
export class CitizenComponent implements OnInit {
  userId: string | null = null;

  contributions: UserContribution[] = [];

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.userId = sessionStorage.getItem('userId');
    this.loadContributions();
  }

  loadContributions(): void {
    forkJoin({
      contributions: this.dataService.getContributions(),
      financialEntities: this.dataService.getFinancialEntities(),
    })
      .pipe(
        map(({ contributions, financialEntities }) => {
          console.log('Contribuciones:', contributions); // Agrega este console.log para verificar las contribuciones
          console.log('Entidades financieras:', financialEntities); // Agrega este console.log para verificar las entidades financieras
  
          return {
            ...contributions,
            contributions: contributions.contributions.map(
              (userContribution) => {
                return {
                  ...userContribution,
                  contributions: userContribution.contributions.map(
                    (contribution) => {
                      const financialEntityName =
                        financialEntities.financialEntities.find((fe) => {
                          return (
                            fe.financialEntityId ===
                            contribution.financialEntityId
                          );
                        })?.name;
  
                      return {
                        ...contribution,
                        financialEntityName, // Esto añade el nombre encontrado a cada contribución
                      };
                    }
                  ),
                };
              }
            ),
          };
        })
      )
      .subscribe({
        next: (enrichedData) => {
          console.log('Datos enriquecidos:', enrichedData); // Agrega este console.log para verificar los datos enriquecidos
  
          this.contributions = enrichedData.contributions.filter(contribution => contribution.userId === this.userId);
          console.log('Contribuciones filtradas:', this.contributions); // Agrega este console.log para verificar las contribuciones filtradas
        },
        error: (error) =>
          console.error(
            'Error al combinar las contribuciones con entidades financieras:',
            error
          ),
      });
  }
}
