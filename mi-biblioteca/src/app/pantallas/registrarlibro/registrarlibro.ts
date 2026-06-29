import { Component, OnInit } from '@angular/core';
import { RouterLink, ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PrestamosService } from '../../services/prestamos.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-registrarlibro',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './registrarlibro.html',
  styleUrl: './registrarlibro.css'
})
export class Registrarlibro implements OnInit {

  libroId: string = '';
  usuarioId: string = '';

  persona: string = '';
  correo: string = '';
  fechaPrestamo: string = '';
  fechaDevolucion: string = '';
  notas: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private prestamosService: PrestamosService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.libroId = this.route.snapshot.queryParamMap.get('libroId') || '';
    this.usuarioId = this.authService.obtenerUsuarioId();

    const hoy = new Date();
    this.fechaPrestamo = hoy.toISOString().substring(0, 10);
  }

  guardarPrestamo(): void {
    if (!this.libroId) {
      alert('No se encontró el libro para registrar el préstamo.');
      return;
    }

    if (!this.usuarioId) {
      alert('No se encontró el usuario. Inicia sesión nuevamente.');
      return;
    }

    if (!this.persona || !this.fechaDevolucion) {
      alert('Completa los campos obligatorios.');
      return;
    }

    const prestamo = {
      libroId: this.libroId,
      usuarioId: this.usuarioId,
      persona: this.persona,
      correo: this.correo,
      fechaPrestamo: this.fechaPrestamo,
      fechaDevolucion: this.fechaDevolucion,
      notas: this.notas
    };

    this.prestamosService.registrarPrestamo(prestamo).subscribe({
      next: () => {
        alert('Préstamo registrado correctamente.');
        this.router.navigate(['/detalleslibro', this.libroId]);
      },
      error: () => {
        alert('No fue posible registrar el préstamo.');
      }
    });
  }
}