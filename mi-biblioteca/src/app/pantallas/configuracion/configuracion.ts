import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-configuracion',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './configuracion.html',
  styleUrls: ['./configuracion.css']
})
export class ConfiguracionComponent implements OnInit {

  usuario: string = 'Usuario';
  correo: string = 'usuario@gmail.com';

  editandoUsuario: boolean = false;
  editandoCorreo: boolean = false;

  pestanaActiva: string = 'perfil';

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.usuario = this.authService.obtenerUsuario() || 'Usuario';
    this.correo = this.authService.obtenerCorreo() || 'usuario@gmail.com';
  }

  cambiarPestana(nombrePestana: string): void {
    this.pestanaActiva = nombrePestana;
  }

  guardarCambios(): void {
    localStorage.setItem('usuario', this.usuario);
    localStorage.setItem('correo', this.correo);

    this.editandoUsuario = false;
    this.editandoCorreo = false;

    alert('Cambios guardados correctamente.');
  }

  cerrarSesion(): void {
    this.authService.cerrarSesion();
    this.router.navigate(['/login']);
  }

  irA(pantalla: string): void {
    switch (pantalla) {
      case 'inicio':
        this.router.navigate(['/panelprincipal']);
        break;

      case 'mis-libros':
        this.router.navigate(['/mislibros']);
        break;

      case 'prestamos':
        this.router.navigate(['/prestamos']);
        break;

      case 'perfil':
        this.router.navigate(['/configuracion']);
        break;
    }
  }

  toggleUsuario(): void {
    this.editandoUsuario = !this.editandoUsuario;
  }

  toggleCorreo(): void {
    this.editandoCorreo = !this.editandoCorreo;
  }
}