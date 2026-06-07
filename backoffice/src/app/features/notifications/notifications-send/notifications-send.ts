import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-notifications-send',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, MatCardModule, MatFormFieldModule,
    MatInputModule, MatSelectModule, MatButtonModule, MatSnackBarModule, MatIconModule],
  templateUrl: './notifications-send.html'
})
export class NotificationsSendComponent {
  private fb = inject(FormBuilder);
  private snack = inject(MatSnackBar);
  sending = false;

  form = this.fb.group({
    target:  ['ALL', [Validators.required]],
    userId:  [''],
    title:   ['', [Validators.required, Validators.maxLength(60)]],
    message: ['', [Validators.required, Validators.maxLength(200)]]
  });

  onSend() {
    if (this.form.invalid) return;
    this.sending = true;
    // this.http.post('/api/notifications/send', this.form.value).subscribe(...)
    setTimeout(() => {
      this.sending = false;
      this.snack.open('Notification envoyée avec succès !', 'OK', { duration: 3000 });
      this.form.reset({ target: 'ALL' });
    }, 1000);
  }
}
