import { Component, inject } from '@angular/core';
import { ToastsVariableService } from '../../shared/toasts-variable.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-toasts-message',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './toasts-message.component.html',
  styleUrl: './toasts-message.component.css'
})
export class ToastsMessageComponent {
  toastVariable=inject(ToastsVariableService);
}
