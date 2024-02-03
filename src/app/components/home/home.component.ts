import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  Count=0;
  authService=inject(AuthService);
  ngOnInit(): void{
    this.authService.getCount().subscribe(
      (response:any)=>{
        this.Count=response.counts;
      },
      error=>{
        console.log(error);
      }
    );
  }
}
