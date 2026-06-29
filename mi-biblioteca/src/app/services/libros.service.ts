import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Libro } from '../models/libro.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class LibrosService {

  private apiUrl = 'http://localhost:4000/libros';

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

  obtenerLibros(): Observable<Libro[]> {
    const usuarioId = this.authService.obtenerUsuarioId();
    return this.http.get<Libro[]>(`${this.apiUrl}?usuarioId=${usuarioId}`);
  }

  obtenerLibroPorId(id: string): Observable<Libro> {
    return this.http.get<Libro>(`${this.apiUrl}/${id}`);
  }

  agregarLibro(libro: Partial<Libro>): Observable<any> {
    return this.http.post<any>(this.apiUrl, libro);
  }

  actualizarLibro(id: string, libro: Partial<Libro>): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, libro);
  }

  actualizarCalificacion(id: string, calificacion: number): Observable<any> {
    return this.http.patch<any>(`${this.apiUrl}/${id}/calificacion`, { calificacion });
  }

  actualizarResena(id: string, resena: string): Observable<any> {
    return this.http.patch<any>(`${this.apiUrl}/${id}/resena`, { resena });
  }

  eliminarLibro(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}