import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ComplaintFormComponent } from '@/app/complaint-form/complaint-form.component';

@Component({
  selector: 'app-footer',
  standalone: true,
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})

export class FooterComponent {
  constructor(public dialog: MatDialog) {}

  openComplaintForm() {
    const dialogRef = this.dialog.open(ComplaintFormComponent, {
      width: '600px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
