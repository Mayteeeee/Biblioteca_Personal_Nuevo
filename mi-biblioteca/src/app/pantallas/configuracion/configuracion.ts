import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-configuracion',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './configuracion.html',
  styleUrls: ['./configuracion.css']
})
export class ConfiguracionComponent implements OnInit {

  usuarioId: string = '';
  usuario: string = '';
  correo: string = '';
  foto: string = '';

  pestanaActiva: string = 'perfil';

  passwordAnterior: string = '';
  passwordNuevo: string = '';
  confirmarPassword: string = '';

  editandoUsuario: boolean = false;
  editandoCorreo: boolean = false;

  constructor(
    private router: Router,
    private authService: AuthService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.usuarioId = this.authService.obtenerUsuarioId();

    this.usuario = this.authService.obtenerUsuario() || '';
    this.correo = this.authService.obtenerCorreo() || '';
    this.foto = this.authService.obtenerFoto() || '';

    if (!this.usuarioId) {
      this.router.navigate(['/login']);
      return;
    }

    this.cargarPerfil();
  }

  cargarPerfil(): void {
    this.authService.obtenerPerfil(this.usuarioId).subscribe({
      next: (data) => {
        this.usuario = data.nombre || this.usuario;
        this.correo = data.correo || this.correo;
        this.foto = data.foto || this.foto;

        this.cdr.detectChanges();
      },
      error: () => {
        this.cdr.detectChanges();
      }
    });
  }

  cambiarPestana(nombrePestana: string): void {
    this.pestanaActiva = nombrePestana;
  }

  toggleUsuario(): void {
    this.editandoUsuario = !this.editandoUsuario;
  }

  toggleCorreo(): void {
    this.editandoCorreo = !this.editandoCorreo;
  }

  guardarCambios(): void {
    if (!this.usuario.trim()) {
      alert('Escribe tu nombre.');
      return;
    }

    if (!this.correo.trim()) {
      alert('Escribe tu correo.');
      return;
    }

    const datos = {
      nombre: this.usuario,
      correo: this.correo,
      foto: this.foto
    };

    this.authService.editarPerfil(this.usuarioId, datos).subscribe({
      next: (respuesta) => {
        this.authService.actualizarDatosSesion(respuesta.usuario);
        this.editandoUsuario = false;
        this.editandoCorreo = false;
        alert('Perfil actualizado correctamente.');
        this.cdr.detectChanges();
      },
      error: () => {
        alert('No fue posible actualizar el perfil.');
      }
    });
  }

  cambiarPassword(): void {
    if (!this.passwordAnterior || !this.passwordNuevo || !this.confirmarPassword) {
      alert('Completa todos los campos de contraseña.');
      return;
    }

    if (this.passwordNuevo !== this.confirmarPassword) {
      alert('La nueva contraseña y la confirmación no coinciden.');
      return;
    }

    const datos = {
      passwordAnterior: this.passwordAnterior,
      passwordNuevo: this.passwordNuevo
    };

    this.authService.cambiarPassword(this.usuarioId, datos).subscribe({
      next: () => {
        alert('Contraseña actualizada correctamente.');
        this.passwordAnterior = '';
        this.passwordNuevo = '';
        this.confirmarPassword = '';
        this.cdr.detectChanges();
      },
      error: (error) => {
        if (error.status === 400) {
          alert('La contraseña actual es incorrecta.');
        } else {
          alert('No fue posible cambiar la contraseña.');
        }
      }
    });
  }

  cerrarSesion(): void {
    this.authService.cerrarSesion();
    this.router.navigate(['/login']);
  }
}