import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'http://localhost:8080/api'; // Ajusta esto según sea necesario

  constructor(private http: HttpClient) { }

  // Navigation
  listNearbyStars(starId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/navigation/nearby-stars/${starId}`);
  }

  travel(travelRequest: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/navigation/travel`, travelRequest);
  }

  // Trade operations
  buyProduct(tradeRequest: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/trade/buy`, tradeRequest);
  }

  sellProduct(tradeRequest: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/trade/sell`, tradeRequest);
  }

  listProductsByPlanet(planetId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/trade/products/${planetId}`);
  }

  // Crews
  getAllCrews(): Observable<any> {
    return this.http.get(`${this.baseUrl}/crews`);
  }

  getCrewById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/crews/${id}`);
  }

  createCrew(crew: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/crews`, crew);
  }

  updateCrew(id: number, crew: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/crews/${id}`, crew);
  }

  deleteCrew(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/crews/${id}`);
  }

  joinCrew(joinRequest: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/crews/join`, joinRequest);
  }

  // Authentication
  loginPlayer(player: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/auth/login`, player);
  }

  registerPlayer(player: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/auth/register`, player);
  }
}
