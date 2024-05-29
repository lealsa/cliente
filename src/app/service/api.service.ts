import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'http://localhost:8080/api'; // Ajusta esto según sea necesario

  constructor(private http: HttpClient) { }

  private handleError(error: HttpErrorResponse) {
    // Chequeo si el error tiene una respuesta y un mensaje de error
    const message = error.error?.message || error.message || 'Error de servidor';
    console.error('Ups! ', message);
    return throwError(() => new Error(message));
  }

  private constructUrl(endpoint: string): string {
    return `${this.baseUrl}/${endpoint}`;
  }

  // Navigation
  listNearbyStars(starId: number): Observable<any> {
    return this.http.get(this.constructUrl(`navigation/nearby-stars/${starId}`)).pipe(
      catchError(this.handleError)
    );
  }

  travel(travelRequest: any): Observable<any> {
    return this.http.post(this.constructUrl('navigation/travel'), travelRequest).pipe(
      catchError(this.handleError)
    );
  }
  getShipById(id: number): Observable<any> {
    return this.http.get(this.constructUrl(`ships/${id}`)).pipe(
      catchError(this.handleError)
    );
  }
  // Trade operations
  // products
  getAllProducts(): Observable<any> {
      return this.http.get(this.constructUrl('products')).pipe(
        catchError(this.handleError)
      );
    }

    getUserGameDetails(userId: number): Observable<any> {
      return this.http.get<any>(this.constructUrl(`games/player/${userId}`)).pipe(
        catchError(this.handleError)
      );
    }

  getProductById(id: number): Observable<any> {
      return this.http.get(this.constructUrl(`products/${id}`)).pipe(
        catchError(this.handleError)
      );
    }

  buyProduct(tradeRequest: any): Observable<any> {
    return this.http.post(this.constructUrl('trade/buy'), tradeRequest).pipe(
      catchError(this.handleError)
    );
  }

  sellProduct(tradeRequest: any): Observable<any> {
    return this.http.post(this.constructUrl('trade/sell'), tradeRequest).pipe(
      catchError(this.handleError)
    );
  }

  listProductsByPlanet(planetId: number): Observable<any> {
    return this.http.get(this.constructUrl(`trade/products/${planetId}`)).pipe(
      catchError(this.handleError)
    );
  }

  // Crews
  getAllCrews(): Observable<any> {
    return this.http.get(this.constructUrl('crews')).pipe(
      catchError(this.handleError)
    );
  }

  getCrewById(id: number): Observable<any> {
    return this.http.get(this.constructUrl(`crews/${id}`)).pipe(
      catchError(this.handleError)
    );
  }

  createCrew(crew: any): Observable<any> {
    return this.http.post(this.constructUrl('crews'), crew).pipe(
      catchError(this.handleError)
    );
  }

  updateCrew(id: number, crew: any): Observable<any> {
    return this.http.put(this.constructUrl(`crews/${id}`), crew).pipe(
      catchError(this.handleError)
    );
  }

  deleteCrew(id: number): Observable<any> {
    return this.http.delete(this.constructUrl(`crews/${id}`)).pipe(
      catchError(this.handleError)
    );
  }

  joinCrew(joinRequest: any): Observable<any> {
    return this.http.post(this.constructUrl('crews/join'), joinRequest).pipe(
      catchError(this.handleError)
    );
  }

  // Authentication
  loginPlayer(player: any): Observable<any> {
    return this.http.post(this.constructUrl('auth/login'), player).pipe(
      catchError(this.handleError)
    );
  }

  registerPlayer(player: any): Observable<any> {
    return this.http.post(this.constructUrl('auth/register'), player).pipe(
      catchError(this.handleError)
    );
  }
  updateUser(userId: number, userUpdate: any): Observable<any> {
    return this.http.put(this.constructUrl(`players/${userId}`), userUpdate).pipe(
        catchError(this.handleError)
    );
}

}
