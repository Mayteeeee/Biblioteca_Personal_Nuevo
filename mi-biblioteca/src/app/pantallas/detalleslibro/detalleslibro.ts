import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { LibrosService } from '../../services/libros.service';
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

  libro: Libro = {
    id: '',
    titulo: '',
    autor: '',
    categoria: '',
    editorial: '',
    anio: undefined,
    paginas: undefined,
    calificacion: 0,
    estado: '',
    imagen: null,
    resena: ''
  };

  constructor(
    private route: ActivatedRoute,
    private librosService: LibrosService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (!id) return;

    this.idLibro = id;
    this.cargarLibro(id);
  }

  cargarLibro(id: string): void {
    this.librosService.obtenerLibroPorId(id).subscribe({
      next: (data) => {
        this.libro = {
          id: data.id || id,
          titulo: data.titulo || '',
          autor: data.autor || '',
          categoria: data.categoria || '',
          editorial: data.editorial || '',
          anio: data.anio,
          paginas: data.paginas,
          calificacion: data.calificacion || 0,
          estado: data.estado || '',
          imagen: data.imagen || null,
          resena: data.resena || ''
        };

        this.cdr.detectChanges();
      },
      error: () => {
        this.libro = {
          id: '',
          titulo: 'No se encontró el libro',
          autor: 'Sin autor',
          categoria: '',
          editorial: '',
          anio: undefined,
          paginas: undefined,
          calificacion: 0,
          estado: 'No disponible',
          imagen: null,
          resena: ''
        };

        this.cdr.detectChanges();
      }
    });
  }

  cambiarPestana(pestana: string): void {
    this.pestanaActiva = pestana;
  }

  puntuarLibro(estrellasSeleccionadas: number): void {
    this.libro.calificacion = estrellasSeleccionadas;

    const id = this.libro.id || this.idLibro;

    if (!id) return;

    this.librosService.actualizarCalificacion(
      id,
      estrellasSeleccionadas
    ).subscribe();
  }

  guardarResena(): void {
    const id = this.libro.id || this.idLibro;

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