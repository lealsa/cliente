import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs'; // Importa 'of' para crear Observables de un valor.
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { User } from '../model/Usuario';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser: Observable<User | null>;

  constructor(private http: HttpClient, private router: Router) {
    const storedUser = localStorage.getItem('currentUser');
    const user: User = storedUser ? JSON.parse(storedUser) : null;
    this.currentUserSubject = new BehaviorSubject<User | null>(user);
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  login(username: string, password: string): Observable<User | null> {
    console.log("Logging")
    console.log("Username: ",username," Password: ",password)
    if (username === "admin") {
      const user: User = this.getDefaultUser(); // Asegúrate de que este método devuelve un usuario adecuado.
      localStorage.setItem('currentUser', JSON.stringify(user));
      this.currentUserSubject.next(user);
      this.router.navigate(['/dashboard']); // Navegar al dashboard
      return of(user); // Retorna un Observable de 'user'.
    }
    return this.http.post<User>(`/api/authenticate`, { username, password }).pipe(
      map(user => {
        if (user) {
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
          this.router.navigate(['/dashboard']); // Navegar al dashboard tras login exitoso
        }
        return user;
      }));
  }

  private getDefaultUser(): User {
    return new User(0, 'admin', '1234', 'Capitan', 'some-token');
  }

  
  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']); // Redirige a la página de login al cerrar sesión
  }
}
