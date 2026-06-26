import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { RouterLink, Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { LibrosService } from '../../services/libros.service';
import { Libro } from '../../models/libro.model';

@Component({
  selector: 'app-agregareditar',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './agregareditar.html',
  styleUrl: './agregareditar.css',
})
export class Agregareditar implements OnInit {

  modoEdicion: boolean = false;
  idLibro: string = '';

  libro: Libro = {
    titulo: '',
    autor: '',
    categoria: '',
    estado: 'porleer',
    editorial: '',
    anio: undefined,
    paginas: undefined,
    calificacion: 0,
    imagen: null,
    resena: ''
  };

  constructor(
    private librosService: LibrosService,
    private router: Router,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (!id) return;

    this.modoEdicion = true;
    this.idLibro = id;

    this.librosService.obtenerLibroPorId(id).subscribe({
      next: (data) => {
        this.libro.id = data.id || id;
        this.libro.titulo = data.titulo || '';
        this.libro.autor = data.autor || '';
        this.libro.categoria = data.categoria || '';
        this.libro.estado = data.estado || 'porleer';
        this.libro.editorial = data.editorial || '';
        this.libro.anio = data.anio;
        this.libro.paginas = data.paginas;
        this.libro.calificacion = data.calificacion || 0;
        this.libro.imagen = data.imagen || null;
        this.libro.resena = data.resena || '';

        this.cdr.detectChanges();
      },
      error: () => {
        alert('No se pudo cargar el libro.');
        this.router.navigate(['/mislibros']);
      }
    });
  }

  cambiarCalificacion(puntos: number): void {
    this.libro.calificacion = puntos;
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = () => {
      this.libro.imagen = reader.result as string;
      this.cdr.detectChanges();
    };

    reader.readAsDataURL(file);
  }

  guardarLibro(): void {
    if (!this.libro.titulo.trim()) {
      alert('Escribe el título del libro.');
      return;
    }

    if (this.modoEdicion) {
      this.actualizarLibro();
    } else {
      this.agregarLibro();
    }
  }

  private agregarLibro(): void {
    this.librosService.agregarLibro(this.libro).subscribe({
      next: () => {
        alert('Libro guardado correctamente.');
        this.router.navigate(['/mislibros']);
      },
      error: () => {
        alert('No fue posible guardar el libro.');
      }
    });
  }

  private actualizarLibro(): void {
    this.librosService.actualizarLibro(this.idLibro, this.libro).subscribe({
      next: () => {
        alert('Libro actualizado correctamente.');
        this.router.navigate(['/mislibros']);
      },
      error: () => {
        alert('No fue posible actualizar el libro.');
      }
    });
  }
}