import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

import { LibrosService } from '../../services/libros.service';
import { AuthService } from '../../services/auth.service';
import { Libro } from '../../models/libro.model';

@Component({
  selector: 'app-panelprincipal',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './panelprincipal.html',
  styleUrl: './panelprincipal.css'
})
export class PanelprincipalComponent implements OnInit {

  nombreUsuario: string = 'Usuario';
  fotoUsuario: string = '';

  libros: Libro[] = [];
  lecturasRecientes: Libro[] = [];

  totalLeidos: number = 0;
  totalPorLeer: number = 0;
  totalPrestados: number = 0;

  constructor(
    private librosService: LibrosService,
    private authService: AuthService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.nombreUsuario = this.authService.obtenerUsuario() || 'Usuario';
    this.fotoUsuario = this.authService.obtenerFoto() || '';
    this.obtenerResumen();
  }

  obtenerResumen(): void {
    this.librosService.obtenerLibros().subscribe({
      next: (data) => {
        this.libros = data;

        this.totalLeidos = this.libros.filter(
          libro => libro.estado === 'leído' || libro.estado === 'favorito'
        ).length;

        this.totalPorLeer = this.libros.filter(libro => libro.estado === 'por leer').length;
        this.totalPrestados = this.libros.filter(libro => libro.estadoPrestamo === 'prestado').length;

        this.lecturasRecientes = this.libros.slice(-3).reverse();

        this.cdr.detectChanges();
      },
      error: () => {
        this.libros = [];
        this.lecturasRecientes = [];
        this.totalLeidos = 0;
        this.totalPorLeer = 0;
        this.totalPrestados = 0;
        this.cdr.detectChanges();
      }
    });
  }

  obtenerEstrellas(calificacion: number | undefined): string {
    const valor = calificacion || 0;
    return '★'.repeat(valor) + '☆'.repeat(5 - valor);
  }
}