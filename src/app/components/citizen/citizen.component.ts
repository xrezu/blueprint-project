import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../../services/data.service';
import { UserContribution } from '../../models/contributions.interface';
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
  contributions: any[] = []; // Ajustado para incluir información adicional

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.userId = sessionStorage.getItem('userId');
    this.loadContributions();
  }

  loadContributions(): void {
    forkJoin({
      contributions: this.dataService.getContributions(),
      financialEntities: this.dataService.getFinancialEntities(),
      users: this.dataService.getUsers(), // Obtener usuarios
    })
      .pipe(
        map(({ contributions, financialEntities, users }) => {
          return contributions.contributions.map(contribution => {
            // Encuentra el nombre del usuario basado en userId
            const userName = users.find(user => user.id === contribution.userId)?.name || 'Nombre no encontrado';

            return {
              ...contribution,
              userName, // Añade el nombre del usuario a cada contribución
              contributions: contribution.contributions.map(subContribution => {
                const financialEntityName = financialEntities.financialEntities.find(fe => fe.financialEntityId === subContribution.financialEntityId)?.name;

                return {
                  ...subContribution,
                  financialEntityName,
                };
              }),
            };
          }).filter(contribution => contribution.userId === this.userId); // Filtra por el userId si es necesario
        })
      )
      .subscribe({
        next: (result) => {
          console.log('Datos enriquecidos:', result);
          this.contributions = result;
        },
        error: (error) => console.error('Error al cargar las contribuciones y usuarios:', error),
      });
  }
}
