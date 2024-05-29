import { Injectable } from '@angular/core';
import { ApiService } from '../service/api.service';
import { Observable, catchError, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor(private apiService: ApiService) { }

  unirse(crewId: number): Observable<any> {
    return this.apiService.joinCrew({ crewId });
  }

  crear(crewName: string): Observable<any> {
    return this.apiService.createCrew({ name: crewName });
  }

  travel(args: string): Observable<any> {
    const [destinationId] = args.split(' ');
    return this.apiService.travel({ destinationId: parseInt(destinationId) });
  }

  handleTransaction(args: string, type: string): Observable<any> {
    const [productId, quantity] = args.split(' ');
    const tradeRequest = { productId: parseInt(productId), quantity: parseInt(quantity) };
    return type === 'buy' ? this.apiService.buyProduct(tradeRequest) : this.apiService.sellProduct(tradeRequest);
  }
  stats(): Observable<any> {
    return new Observable(observer => {
      observer.next("Estadísticas del juego");  // Placeholder
      observer.complete();
    });
  }
  updateUserRole(newRole: string): Observable<any> {
    const userId = this.getUserIdFromLocalStorage(); // Suponiendo que el ID está almacenado en localStorage
    if (!userId) {
      return of('Usuario no autenticado');
    }
    const userUpdate = { role: newRole };
    return this.apiService.updateUser(userId, userUpdate).pipe(
      tap(() => this.updateRoleInLocalStorage(newRole)),
      catchError(error => {
        console.error('Error actualizando el rol:', error);
        return of('Error al actualizar el rol');
      })
    );
  }

  private getUserIdFromLocalStorage(): number | null {
    const userData = localStorage.getItem('userData');
    return userData ? JSON.parse(userData).userId : null;
  }

  private updateRoleInLocalStorage(newRole: string) {
    const userData = localStorage.getItem('userData');
    if (userData) {
      const userObj = JSON.parse(userData);
      userObj.role = newRole;
      localStorage.setItem('userData', JSON.stringify(userObj));
    }
  }

  radar(): Observable<any> {
    return new Observable(observer => {
      observer.next("Radar activo");  // Placeholder
      observer.complete();
    });
  }
  list(starId: number): Observable<any> {
    // Llama al método listNearbyStars de ApiService
    return this.apiService.listNearbyStars(starId);
  }

  authenticateUser(credentials: string): Observable<any> {
    const [username, password] = credentials.split(' ');
    return this.apiService.loginPlayer({ username, password });
  }
}
