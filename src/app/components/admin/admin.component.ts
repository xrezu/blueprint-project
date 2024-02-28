import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '@/app/services/data.service';
import { forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { FinancialEntity } from '@/app/models/FEntity.model';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent implements OnInit {
  // asume que tienes una interfaz o tipo adecuado para tus contribuciones enriquecidas
  contributions: any[] = []; // Utiliza el tipo adecuado aquí

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.loadContributions();
  }

  loadContributions(): void {
  forkJoin({
    users: this.dataService.getUsers(),
    promoters: this.dataService.getPromoters(),
    financialEntitiesObj: this.dataService.getFinancialEntities(),
    contributionsObj: this.dataService.getContributions()
  })
  .pipe(
    map(({ users, promoters, financialEntitiesObj, contributionsObj }) => {
      console.log("Usuarios cargados:", users); // Verifica los datos de usuarios cargados
      console.log("Promotores cargados:", promoters); // Opcional: Verifica los datos de promotores cargados
      console.log("Entidades Financieras cargadas:", financialEntitiesObj.financialEntities); // Verifica los datos de entidades financieras cargados
      console.log("Contribuciones cargadas:", contributionsObj.contributions); // Verifica los datos de contribuciones cargados

      const financialEntities = financialEntitiesObj.financialEntities;

      return contributionsObj.contributions.flatMap(contribution => 
        contribution.contributions.map(subContribution => {
          // Mueve el acceso a userId aquí, utilizando el userId del objeto contribution
          const user = users.find(u => u.id === contribution.userId); // Usar contribution.userId
          const promoter = promoters.find(p => p.id === subContribution.promoterId);
          const financialEntity = financialEntities.find(e => e.financialEntityId === subContribution.financialEntityId);
      
          return {
            ...subContribution,
            userName: user ? user.name : 'Usuario no encontrado',
            promoterName: promoter ? promoter.name : 'Promotor no encontrado',
            financialEntityName: financialEntity ? financialEntity.name : 'Entidad Financiera no encontrada',
            // Asegúrate de incluir y mapear correctamente el resto de campos necesarios
          };
        })
      );
    })
  )
  .subscribe({
    next: (enrichedContributions) => {
      this.contributions = enrichedContributions; // Asegúrate de que esto coincida con la propiedad usada en tu template
      console.log('Contribuciones enriquecidas:', this.contributions);
    },
    error: (error) => console.error('Error al cargar y enriquecer las contribuciones', error),
  });
}
}