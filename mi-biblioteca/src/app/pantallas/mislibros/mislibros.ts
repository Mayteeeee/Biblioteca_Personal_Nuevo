import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { LibrosService } from '../../services/libros.service';
import { Libro } from '../../models/libro.model';

@Component({
  selector: 'app-mislibros',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './mislibros.html',
  styleUrl: './mislibros.css'
})
export class MisLibrosComponent implements OnInit {

  textoBusqueda: string = '';

  libros: Libro[] = [];
  librosFiltrados: Libro[] = [];

  filtroActivo: string = 'todos';

  datosCargados: boolean = false;

  constructor(
    private librosService: LibrosService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.obtenerLibros();
  }

  obtenerLibros(): void {

    this.datosCargados = false;

    this.librosService.obtenerLibros().subscribe({

      next: (data) => {

        this.libros = data;

        this.filtroActivo = 'todos';

        this.aplicarFiltro();

        this.datosCargados = true;

        this.cdr.detectChanges();
      },

      error: () => {

        this.libros = [];
        this.librosFiltrados = [];

        this.datosCargados = true;

        this.cdr.detectChanges();
      }

    });

  }

  cambiarFiltro(filtro: string): void {

    this.filtroActivo = filtro;

    this.aplicarFiltro();

    this.cdr.detectChanges();

  }

  aplicarFiltro(): void {

    let resultado = [...this.libros];

    if (this.filtroActivo !== 'todos') {

      resultado = resultado.filter(
        libro => libro.estado === this.filtroActivo
      );

    }

    if (this.textoBusqueda.trim() !== '') {

      resultado = resultado.filter(libro =>
        libro.titulo.toLowerCase().includes(
          this.textoBusqueda.toLowerCase()
        )
      );

    }

    this.librosFiltrados = resultado;

  }

  eliminarLibro(id: string, event: Event): void {

    event.stopPropagation();

    const confirmar = confirm('¿Seguro que quieres eliminar este libro?');

    if (!confirmar) return;

    this.librosService.eliminarLibro(id).subscribe({

      next: () => {

        this.libros = this.libros.filter(
          libro => libro.id !== id
        );

        this.aplicarFiltro();

        this.cdr.detectChanges();

      },

      error: () => {

        alert('No fue posible eliminar el libro.');

      }

    });

  }

}