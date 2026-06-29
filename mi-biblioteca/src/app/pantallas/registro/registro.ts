import { Component } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './registro.html',
  styleUrl: './registro.css'
})
export class RegistroComponent {
  nombre: string = '';
  correo: string = '';
  password: string = '';
  confirmarPassword: string = '';

  mostrarPassword = false;
  mostrarConfirmarPassword = false;

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  togglePassword(): void {
    this.mostrarPassword = !this.mostrarPassword;
  }

  toggleConfirmarPassword(): void {
    this.mostrarConfirmarPassword = !this.mostrarConfirmarPassword;
  }

  registrarUsuario(): void {
    if (!this.nombre || !this.correo || !this.password || !this.confirmarPassword) {
      alert('Completa todos los campos');
      return;
    }

    if (this.password !== this.confirmarPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }

    const usuario = {
      nombre: this.nombre,
      correo: this.correo,
      password: this.password,
      foto: ''
    };

    this.authService.registrarUsuario(usuario).subscribe({
      next: () => {
        alert('Usuario registrado correctamente');
        this.router.navigate(['/login']);
      },
      error: (error) => {
        if (error.status === 400) {
          alert('Ese correo ya está registrado');
        } else {
          alert('Error al registrar usuario');
        }
      }
    });
  }
}