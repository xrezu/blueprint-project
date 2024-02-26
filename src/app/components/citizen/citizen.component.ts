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
  //TODO: descomentar la variable cuando se termine la parte de autentificación
  //userId: string | null = null;

  contributions: UserContribution[] = [];

  constructor(private dataService: DataService) {}

  ngOnInit() {
    //TODO: descomentar la línea cuando se termine la parte de autentificación
    //this.userId = sessionStorage.getItem('userId');
    this.loadContributions();
  }

  loadContributions(): void {
    forkJoin({
      contributions: this.dataService.getContributions(),
      financialEntities: this.dataService.getFinancialEntities(),
    })
      .pipe(
        map(({ contributions, financialEntities }) => {
          // Asegúrate de acceder a la propiedad correcta aquí
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
          this.contributions = enrichedData.contributions;
        },
        error: (error) =>
          console.error(
            'Error al combinar las contribuciones con entidades financieras:',
            error
          ),
      });
  }

  // TODO: implementar el filtro en funcion del usuario cuando se termine la parte de autentificación
  // loadContributions(): void {
  //   this.dataService.getContributions().subscribe({
  //     next: (response) => {
  //       if (this.userId) {
  //         // Filtrar las contribuciones basadas en el userId
  //         this.contributions = response.contributions.filter(contribution => contribution.userId === this.userId);
  //       } else {
  //         // Manejar el caso en que no hay un userId (usuario no logueado o error)
  //         this.contributions = [];
  //       }
  //     },
  //     error: (error) => console.error('Error al obtener las contribuciones:', error)
  //   });
  // }
}
