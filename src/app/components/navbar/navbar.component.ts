import { Component,inject } from '@angular/core';
import { RouterLink,Router, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SessionTokenManagerService } from '../../services/session-token-manager.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink,CommonModule,RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent{
  router=inject(Router);
  session=inject(SessionTokenManagerService);
  userLogout(){
    this.session.removeToken();
    this.router.navigate(['/login']);
  }
}
