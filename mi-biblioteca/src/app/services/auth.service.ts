import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  iniciarSesion(): void {
    localStorage.setItem('logueado', 'true');

    if (!localStorage.getItem('usuario')) {
      localStorage.setItem('usuario', 'Mayte');
    }

    if (!localStorage.getItem('correo')) {
      localStorage.setItem('correo', 'mayte@biblioteca.com');
    }
  }

  cerrarSesion(): void {
    localStorage.removeItem('logueado');
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
}