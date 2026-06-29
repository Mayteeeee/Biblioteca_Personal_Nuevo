import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { PrestamosService } from '../../services/prestamos.service';

@Component({
  selector: 'app-prestamos',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './prestamos.html',
  styleUrls: ['./prestamos.css']
})
export class PrestamosComponent implements OnInit {

  pestanaActiva: string = 'activos';

  prestamos: any[] = [];
  prestamosActivos: any[] = [];
  prestamosHistorial: any[] = [];

  datosCargados: boolean = false;

  constructor(
    private prestamosService: PrestamosService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.obtenerPrestamos();
  }

  obtenerPrestamos(): void {
    this.datosCargados = false;

    this.prestamosService.obtenerPrestamos().subscribe({
      next: (data) => {
        this.prestamos = data;

        this.prestamosActivos = this.prestamos.filter(prestamo => !prestamo.devuelto);
        this.prestamosHistorial = this.prestamos.filter(prestamo => prestamo.devuelto);

        this.datosCargados = true;
        this.cdr.detectChanges();
      },
      error: () => {
        this.prestamos = [];
        this.prestamosActivos = [];
        this.prestamosHistorial = [];
        this.datosCargados = true;
        this.cdr.detectChanges();
      }
    });
  }

  cambiarPestana(nombrePestana: string): void {
    this.pestanaActiva = nombrePestana;
  }

  marcarComoDevuelto(idPrestamo: string): void {
    const confirmar = confirm('¿Marcar este préstamo como devuelto?');

    if (!confirmar) return;

    this.prestamosService.marcarDevolucion(idPrestamo).subscribe({
      next: () => {
        alert('Préstamo marcado como devuelto.');
        this.obtenerPrestamos();
      },
      error: () => {
        alert('No fue posible marcar el préstamo como devuelto.');
      }
    });
  }
}