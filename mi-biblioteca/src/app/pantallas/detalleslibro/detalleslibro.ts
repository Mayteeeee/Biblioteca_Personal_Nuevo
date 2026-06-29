import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { LibrosService } from '../../services/libros.service';
import { PrestamosService } from '../../services/prestamos.service';
import { Libro } from '../../models/libro.model';

@Component({
  selector: 'app-detalle-libro',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './detalleslibro.html',
  styleUrl: './detalleslibro.css'
})
export class DetalleLibroComponent implements OnInit {

  pestanaActiva: string = 'informacion';
  maxEstrellas: number[] = [1, 2, 3, 4, 5];

  idLibro: string = '';
  historialPrestamos: any[] = [];

  libro: Libro = {
    _id: '',
    id: '',
    titulo: '',
    autor: '',
    categoria: '',
    editorial: '',
    anio: undefined,
    paginas: undefined,
    calificacion: 0,
    estado: '',
    estadoPrestamo: '',
    imagen: null,
    resena: ''
  };

  constructor(
    private route: ActivatedRoute,
    private librosService: LibrosService,
    private prestamosService: PrestamosService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (!id) return;

    this.idLibro = id;
    this.cargarLibro(id);
    this.cargarHistorialPrestamos(id);
  }

  cargarLibro(id: string): void {
    this.librosService.obtenerLibroPorId(id).subscribe({
      next: (data) => {
        this.libro = {
          _id: data._id,
          id: data._id || data.id || id,
          titulo: data.titulo || '',
          autor: data.autor || '',
          categoria: data.categoria || '',
          editorial: data.editorial || '',
          anio: data.anio,
          paginas: data.paginas,
          calificacion: data.calificacion || 0,
          estado: data.estado || '',
          estadoPrestamo: data.estadoPrestamo || 'disponible',
          imagen: data.imagen || null,
          resena: data.resena || '',
          usuarioId: data.usuarioId
        };

        this.cdr.detectChanges();
      },
      error: () => {
        this.libro = {
          _id: '',
          id: '',
          titulo: 'No se encontró el libro',
          autor: 'Sin autor',
          categoria: '',
          editorial: '',
          anio: undefined,
          paginas: undefined,
          calificacion: 0,
          estado: 'No disponible',
          estadoPrestamo: 'No disponible',
          imagen: null,
          resena: ''
        };

        this.cdr.detectChanges();
      }
    });
  }

  cargarHistorialPrestamos(id: string): void {
    this.prestamosService.obtenerPrestamosPorLibro(id).subscribe({
      next: (data) => {
        this.historialPrestamos = data;
        this.cdr.detectChanges();
      },
      error: () => {
        this.historialPrestamos = [];
        this.cdr.detectChanges();
      }
    });
  }

  cambiarPestana(pestana: string): void {
    this.pestanaActiva = pestana;
  }

  puntuarLibro(estrellasSeleccionadas: number): void {
    const id = this.libro._id || this.libro.id || this.idLibro;

    if (!id) return;

    this.libro.calificacion = estrellasSeleccionadas;

    this.librosService.actualizarCalificacion(
      id,
      estrellasSeleccionadas
    ).subscribe();
  }

  guardarResena(): void {
    const id = this.libro._id || this.libro.id || this.idLibro;

    if (!id) {
      alert('No se encontró el libro.');
      return;
    }

    this.librosService.actualizarResena(id, this.libro.resena || '').subscribe({
      next: () => {
        alert('Reseña guardada correctamente.');
      },
      error: () => {
        alert('No fue posible guardar la reseña.');
      }
    });
  }
}