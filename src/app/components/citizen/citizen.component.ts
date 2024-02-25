import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../../services/data.service';
import { UserContribution } from '../../models/contributions.interface';


@Component({
  selector: 'app-citizen',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './citizen.component.html',
  styleUrls: ['./citizen.component.css']
})
export class CitizenComponent implements OnInit {
  contributions: UserContribution[] = [];

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.loadContributions();
  }

  loadContributions(): void {
    this.dataService.getContributions().subscribe({
      next: (response) => {
        this.contributions = response.contributions;
      },
      error: (error) => console.error('Error al obtener las contribuciones:', error)
    });
  }
}
