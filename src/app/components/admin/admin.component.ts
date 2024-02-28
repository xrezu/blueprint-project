import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '@/app/services/data.service';
import { forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { FinancialEntity } from '../../models/FEntity.model';
import { Contribution, ContributionsResponse } from '@/app/models/contributions.interface';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent implements OnInit {
  contributions: Contribution[] = [];

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
        const contributions = contributionsObj.contributions;
        const financialEntities = financialEntitiesObj.financialEntities;


        return contributions.map(contribution => {
          return {
            ...contribution,
            contributions: contribution.contributions.map(subContribution => {
              const user = users.find(u => u.id === subContribution.userId);
              const promoter = promoters.find(p => p.id === subContribution.promoterId);
              const financialEntity = financialEntities.find(e => e.financialEntityId === subContribution.financialEntityId);

              return {
                ...subContribution,
                userName: user ? user.name : 'Unknown User',
                promoterName: promoter ? promoter.name : 'Unknown Promoter',
                financialEntityName: financialEntity ? financialEntity.name : 'Unknown Entity'
              };
            })
          };
        });
      })
    )
    .subscribe({
      next: (enrichedContributions) => {
        this.contributions = enrichedContributions;
        console.log('Admin contributions enriched:', this.contributions);
      },
      error: (error) => console.error('Error loading and enriching admin contributions', error),
    });
  }
}