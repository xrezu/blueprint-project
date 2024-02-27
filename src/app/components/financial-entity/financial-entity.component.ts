import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../../services/data.service';
import { UserContribution } from '../../models/contributions.interface';
import { Promoter } from '../../models/promoter.model';
import { FinancialEntity } from '../../models/FEntity.model';
import { User } from '../../models/user.model';
import { forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-financial-entity',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './financial-entity.component.html',
  styleUrl: './financial-entity.component.css'
})
export class FinancialEntityComponent implements OnInit {
  contributions: UserContribution[] = [];
  financialEntity: { financialEntityId: string, name: string, contactEmail: string; }[] | undefined;

  constructor(private dataServive: DataService) {}

  ngOnInit() {
    this.loadContributions();
  }

  loadContributions(): void {
  
  }
}
