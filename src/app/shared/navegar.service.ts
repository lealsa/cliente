import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Estrella } from '../model/Estrella';
import { environment } from '../../environments/environment.development';


@Injectable({
  providedIn: 'root'
})
export class NavegarService {

  constructor(
    private http: HttpClient
  ) { }

  private headers = new HttpHeaders(
    {"Content-Type": "application/json"}
  )

  mostrarEstrellas(): Observable<Estrella[]>{
    return this.http.get<Estrella[]>(`${environment.serverUrl}/api/navegar/list`)
  }

  cambiarCoordenadasNave(id: number): Observable<any> {
    return this.http.post<any>(`${environment.serverUrl}/api/navegar/desplazar-nave/${id}`,id);
  }

}
