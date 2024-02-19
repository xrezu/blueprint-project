import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PetitionService {
  constructor(private http: HttpClient) { }

  submitPetition(formData: any) {
    // Aquí iría la lógica para enviar los datos al backend
    console.log('Data to be submitted:', formData);
    // Simulación de envío de datos
    // En un caso real, reemplazarías esto con una petición POST a tu API
    // this.http.post('tu-api-endpoint', formData).subscribe();
  }
}
