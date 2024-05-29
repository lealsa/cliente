import { Component } from '@angular/core';
import { AuthService } from '../guard/auth.service';
import { NotificationService } from '../service/notification.service'; // Asegúrate que la ruta al servicio sea correcta

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(
    private authService: AuthService,
    private notificationService: NotificationService // Inyecta el servicio de notificaciones
  ) {}
  goToRegister(): void {
    console.log("Register in...");
    this.authService.register(this.username, this.password).subscribe({
      next: (user) => {
        console.log('Register successful', user);
        this.notificationService.show('Login exitoso!', 'success', 'Bienvenido!');
      },
      error: (error) => {
        console.error('Register failed', error);
        this.notificationService.show('Fallo login.', 'error', 'Error de autenticacion');
      }
    });
  }

  login() {
    console.log("Logging in...");
    this.authService.login(this.username, this.password).subscribe({
      next: (user) => {
        console.log('Login successful', user);
        this.notificationService.show('Login exitoso!', 'success', 'Bienvenido!');
      },
      error: (error) => {
        console.error('Login failed', error);
        this.notificationService.show('Fallo login.', 'error', 'Error de autenticacion');
      }
    });
  }
}
