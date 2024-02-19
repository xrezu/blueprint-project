import { Component } from '@angular/core';

@Component({
  selector: 'app-complaint-form',
  templateUrl: './complaint-form.component.html',
  styleUrls: ['./complaint-form.component.css']
})
export class ComplaintFormComponent {

  constructor() { }

  submitForm() {
    // Aquí recogerías los datos del formulario
    const formData = {
      name: '', // Sustituye con el valor real
      email: '', // Sustituye con el valor real
      complaint: '' // Sustituye con el valor real
    };

    // Simulación de envío de datos al Local Storage
    const complaints = JSON.parse(localStorage.getItem('complaints') || '[]');
    complaints.push(formData);
    localStorage.setItem('complaints', JSON.stringify(complaints));

    console.log('Complaint submitted:', formData);
  }
}
