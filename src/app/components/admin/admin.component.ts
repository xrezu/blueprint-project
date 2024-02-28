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
      financialEntities: this.dataService.getFinancialEntities(),
      contributions: this.dataService.getContributions()
    })
    .pipe(
      map(({ users, promoters, financialEntities, contributions }) => {
        const userMap = new Map(users.map(user => [user.id, user.name]));
        const promoterMap = new Map(promoters.map(promoter => [promoter.id, promoter.name]));
        const financialEntityMap = new Map(financialEntities.map(entity => [entity.id, entity.name]));

        return contributions.contributions.flatMap(contribution => 
          contribution.contributions.map(subContribution => ({
            ...subContribution,
            userName: userMap.get(contribution.userId) || 'Unknown User',
            promoterName: promoterMap.get(subContribution.promoterId) || 'Unknown Promoter',
            financialEntityName: financialEntityMap.get(subContribution.financialEntityId) || 'Unknown Entity',
          }))
        );
      })
    )
    .subscribe({
      next: (transformedContributions) => {
        this.contributions = transformedContributions;
      },
      error: (error) => console.error('Error loading and transforming contributions', error),
    });
  }
}