import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-recuperacion',
  standalone: true,
  imports: [RouterModule, FormsModule, CommonModule],
  templateUrl: './recuperacion.html',
  styleUrl: './recuperacion.css'
})
export class Recuperacion {
  correo: string = '';
  cargando: boolean = false;

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  regresar(): void {
    this.router.navigate(['/login']);
  }

  enviarCodigo(): void {
    if (!this.correo.trim()) {
      alert('Escribe tu correo electrónico.');
      return;
    }

    this.cargando = true;

    this.authService.enviarCodigoRecuperacion(this.correo).subscribe({
      next: () => {
        this.cargando = false;
        localStorage.setItem('correoRecuperacion', this.correo);
        alert('Código enviado. Revisa tu correo.');
        this.router.navigate(['/verificacion']);
      },
      error: (error) => {
        this.cargando = false;

        if (error.status === 404) {
          alert('No existe una cuenta con ese correo.');
        } else {
          alert('No fue posible enviar el código.');
        }
      }
    });
  }
}