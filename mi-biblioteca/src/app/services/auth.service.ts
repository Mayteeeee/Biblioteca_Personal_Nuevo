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

  obtenerPerfil(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  editarPerfil(id: string, datos: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, datos);
  }

  cambiarPassword(id: string, datos: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/password/${id}`, datos);
  }

  guardarSesion(usuario: any): void {
    localStorage.setItem('logueado', 'true');
    localStorage.setItem('usuarioId', usuario.id || usuario._id);
    localStorage.setItem('usuario', usuario.nombre);
    localStorage.setItem('correo', usuario.correo);
    localStorage.setItem('foto', usuario.foto || '');
  }

  actualizarDatosSesion(usuario: any): void {
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

  obtenerFoto(): string {
    return localStorage.getItem('foto') || '';
  }

  enviarCodigoRecuperacion(correo: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/recuperar`, { correo });
  }

  restablecerPassword(datos: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/restablecer`, datos);
  }
}