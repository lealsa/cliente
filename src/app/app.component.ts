import { Component, OnInit} from '@angular/core';
import { AuthService } from './guard/auth.service'; // Asegúrate de que este servicio esté implementado correctamente
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Comerciante Espacial';

  constructor(private authService: AuthService,private primengConfig: PrimeNGConfig) {}

  ngOnInit() {
      this.primengConfig.ripple = true;
  }
  logout() {
    this.authService.logout();
  }
}
