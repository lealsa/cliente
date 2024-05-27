import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { InfoProducto } from '../dto/info-producto';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})


export class ComprarService {
  constructor(private http: HttpClient) {}


  listarProductos(planetaId: number): Observable<InfoProducto[]> {
    return this.http.get<InfoProducto[]>(`${environment.serverUrl}/api/comprar/list/${planetaId}`)
      .pipe(tap(data => console.log('Data from API:', data)));
  }

  realizarCompra(id: number): Observable<any> {
    return this.http.post<any>(`${environment.serverUrl}/api/comprar/realizar-compra/${id}`, id);
  }

  actualizarPuntaje(id: number): Observable<any> {
    return this.http.post<any>(`${environment.serverUrl}/api/comprar/actualizar-puntaje/${id}`, id);
  }
}
