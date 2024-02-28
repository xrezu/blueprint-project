import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-complaint-form',
  standalone: true,
  templateUrl: './complaint-form.component.html',
  styleUrls: ['./complaint-form.component.css'],
  imports: [FormsModule]
})
export class ComplaintFormComponent {
  // Define la URL del endpoint del servidor para enviar las reclamaciones
  private complaintsUrl = 'http://localhost:3000/claims';
  isFormVisible: boolean = true;
  // Inyecta el HttpClient
  constructor(private http: HttpClient) { }
  closeForm() {
    this.isFormVisible = false; // Cambia el estado para ocultar el formulario
  }

  // Función para abrir el formulario (opcional)
  openForm() {
    this.isFormVisible = true; // Cambia el estado para mostrar el formulario
  }
  
  submitForm(form: NgForm) {
    // Verifica si el formulario es válido
    if (form.valid) {
      const formData = form.value;

      // Usa HttpClient para enviar los datos del formulario al servidor
      this.http.post(this.complaintsUrl, formData).subscribe({
        next: (response) => {
          console.log('Form Data submitted: ', formData);
          console.log('Server Response: ', response);
          form.reset();  
        },
        error: (error) => {
          console.error('There was an error!', error);
        }
      });
    } else {
      console.error('Form is not valid');
    }
  }
}