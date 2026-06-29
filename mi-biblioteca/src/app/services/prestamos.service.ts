import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class PrestamosService {

  private apiUrl = 'http://localhost:4000/prestamos';

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

  obtenerPrestamosPorLibro(idLibro: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/libro/${idLibro}`);
  }

  registrarPrestamo(prestamo: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, prestamo);
  }

  obtenerPrestamos(): Observable<any[]> {
    const usuarioId = this.authService.obtenerUsuarioId();
    return this.http.get<any[]>(`${this.apiUrl}?usuarioId=${usuarioId}`);
  }

  marcarDevolucion(idPrestamo: string): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${idPrestamo}`, {});
  }

  eliminarPrestamo(idPrestamo: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${idPrestamo}`);
  }
}