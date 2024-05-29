import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, forkJoin, of, throwError } from 'rxjs'; // Importa 'of' para crear Observables de un valor.
import { catchError, map, switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { User } from '../model/Usuario';
import { ApiService } from '../service/api.service';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser: Observable<User | null>;
  private baseUrl: string = "http://localhost:8080";
  constructor(private ApiService: ApiService,private http: HttpClient, private router: Router) {
    const storedUser = localStorage.getItem('currentUser');
    const user: User = storedUser ? JSON.parse(storedUser) : null;
    this.currentUserSubject = new BehaviorSubject<User | null>(user);
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  login(username: string, password: string): Observable<User | null> {
    if (username === "admin") {
        const user: User = this.getDefaultUser(); // Asegúrate de que este método devuelve un usuario adecuado.
        this.processLoginSuccess(user);
        return of(user); // Retorna un Observable de 'user'.
    }
    return this.http.post<User>(`${this.baseUrl}/api/auth/login`, { usuario: username, contrasena: password }).pipe(
        map(user => {
            if (user) {
                this.processLoginSuccess(user);
            }
            return user;
        }),
        catchError(error => {
            console.error('Error during login:', error);
            return throwError(() => new Error('Failed to login'));
        })
    );
}

private processLoginSuccess(user: User): void {
    localStorage.setItem('currentUser', JSON.stringify(user));
    this.currentUserSubject.next(user);
    localStorage.setItem('role', user.rol);
    this.fetchAndStoreUserGameDetails(user.id); // Suponiendo que tienes el ID del usuario
    this.router.navigate(['/dashboard']); // Navegar al dashboard tras login exitoso
}
private fetchAndStoreUserGameDetails(userId: number): void {
  this.ApiService.getUserGameDetails(userId).pipe(
      switchMap((gameDetails) => {
          // Almacena los detalles principales del juego en el almacenamiento local
          localStorage.setItem('partida', JSON.stringify(gameDetails));
          console.log(gameDetails);
          console.log(gameDetails.tripulacionId);

          // Primero consulta los detalles de la tripulación basados en el ID obtenido
          return this.ApiService.getCrewById(gameDetails.tripulacionId).pipe(
              map((crewDetails) => {
                  // Almacena los detalles de la tripulación en el almacenamiento local
                  localStorage.setItem('tripulacion', JSON.stringify(crewDetails));

                  // Consulta y almacena los detalles de la nave usando el ID de nave obtenido de la tripulación
                  localStorage.setItem('nave', JSON.stringify(crewDetails.nave));
                  return crewDetails.nave;  // Esto asume que nave es un objeto detallado y no solo un ID
              })
          );
      }),
      catchError(error => {
          console.error('Failed to load game details:', error);
          return throwError(() => new Error('Failed to fetch additional game details'));
      })
  ).subscribe({
      next: (naveDetails) => {
          // Información adicional puede ser procesada aquí si naveDetails es más que un ID
          console.log('Nave details:', naveDetails);
      },
      error: (error) => {
          console.error('Failed to fetch additional details:', error);
      }
  });
}


  getUserRole(): string {
    return localStorage.getItem('role') || '';
  }
  private getDefaultUser(): User {
    return new User(0, 'admin', '1234', 'Capitan');
  }

  register(username: string, password: string): Observable<User | any> {
    return this.http.post<User>(`${this.baseUrl}/api/auth/register`,  { usuario: username, contrasena: password, rol: '' }).pipe(
      map(user => {
        if (user) { // Asumiendo que el backend devuelve un objeto 'user' con un 'token' después del registro
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
          this.router.navigate(['/dashboard']); // Navegar al dashboard tras registro exitoso
        }
        return user;
      })
    );
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']); // Redirige a la página de login al cerrar sesión
  }
}
