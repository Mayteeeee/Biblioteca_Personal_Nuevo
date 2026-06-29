import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:4000/usuarios';

  constructor(private http: HttpClient) {}

  registrarUsuario(usuario: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/registro`, usuario);
  }

  loginUsuario(datos: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, datos);
  }

  guardarSesion(usuario: any): void {
    localStorage.setItem('logueado', 'true');
    localStorage.setItem('usuarioId', usuario.id);
    localStorage.setItem('usuario', usuario.nombre);
    localStorage.setItem('correo', usuario.correo);
    localStorage.setItem('foto', usuario.foto || '');
  }

  cerrarSesion(): void {
    localStorage.removeItem('logueado');
    localStorage.removeItem('usuarioId');
    localStorage.removeItem('usuario');
    localStorage.removeItem('correo');
    localStorage.removeItem('foto');
  }

  estaLogueado(): boolean {
    return localStorage.getItem('logueado') === 'true';
  }

  obtenerUsuario(): string {
    return localStorage.getItem('usuario') || '';
  }

  obtenerCorreo(): string {
    return localStorage.getItem('correo') || '';
  }

  obtenerUsuarioId(): string {
    return localStorage.getItem('usuarioId') || '';
  }
}