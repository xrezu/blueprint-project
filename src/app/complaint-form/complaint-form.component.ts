import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

  @Component({
    selector: 'app-complaint-form',
    standalone: true,
    templateUrl: './complaint-form.component.html',
    styleUrls: ['./complaint-form.component.css'],
    imports: [FormsModule]
  })
  export class ComplaintFormComponent {
    constructor() { }
    
    submitForm(form: any) {
      const formData = form.value;

      const currentComplaints = JSON.parse(localStorage.getItem('complaints') || '[]');

      currentComplaints.push(formData);

      localStorage.setItem('complaints', JSON.stringify(currentComplaints));

      console.log('Form Data: ', formData);
      console.log('All Complaints: ', currentComplaints);
      
      form.reset();
    }
}
