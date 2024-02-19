import { Component } from '@angular/core';
  @Component({
    selector: 'app-complaint-form',
    templateUrl: './complaint-form.component.html',
    styleUrls: ['./complaint-form.component.css']
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
