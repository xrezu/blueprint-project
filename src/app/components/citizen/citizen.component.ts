import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service'; // Asegúrate de que la ruta de importación sea correcta

@Component({
  selector: 'app-citizen',
  standalone: true,
  templateUrl: './citizen.component.html',
  styleUrls: ['./citizen.component.css']
})
export class CitizenComponent implements OnInit {
  datosCiudadano: any = null;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.cargarDatos();
  }

  cargarDatos(): void {
    const url = 'https://api.miservidor.com/datos-ciudadano'; // Reemplaza con la URL real de tu API
    this.dataService.getUsers().subscribe({
      next: (datos) => {
        this.datosCiudadano = datos;
      },
      error: (error) => console.error('Error al obtener datos:', error),
      complete: () => console.log('Petición de datos del ciudadano completada')
    });
  }
}
