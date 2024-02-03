import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ToastsMessageComponent } from './components/toasts-message/toasts-message.component';
import { ToastsVariableService } from './shared/toasts-variable.service';
@Component({
  selector: 'app-root',
  standalone: true,
  //for add new component in the parent so add that child component in the imports 
  imports: [CommonModule, RouterOutlet,NavbarComponent,ToastsMessageComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Portal_frontend';
  toastVariable=inject(ToastsVariableService);
}
