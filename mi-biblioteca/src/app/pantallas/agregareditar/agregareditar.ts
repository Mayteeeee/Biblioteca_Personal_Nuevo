import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { RouterLink, Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { LibrosService } from '../../services/libros.service';
import { AuthService } from '../../services/auth.service';
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
    estado: 'por leer',
    estadoPrestamo: 'disponible',
    editorial: '',
    anio: undefined,
    paginas: undefined,
    calificacion: 1,
    imagen: null,
    resena: '',
    usuarioId: ''
  };

  constructor(
    private librosService: LibrosService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (!id) {
      this.libro.usuarioId = this.authService.obtenerUsuarioId();
      return;
    }

    this.modoEdicion = true;
    this.idLibro = id;

    this.librosService.obtenerLibroPorId(id).subscribe({
      next: (data) => {
        this.libro = {
          _id: data._id,
          id: data._id || data.id || id,
          titulo: data.titulo || '',
          autor: data.autor || '',
          categoria: data.categoria || '',
          estado: data.estado || 'por leer',
          estadoPrestamo: data.estadoPrestamo || 'disponible',
          editorial: data.editorial || '',
          anio: data.anio,
          paginas: data.paginas,
          calificacion: data.calificacion || 1,
          imagen: data.imagen || null,
          resena: data.resena || '',
          usuarioId: data.usuarioId || this.authService.obtenerUsuarioId()
        };

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
    if (!this.libro.titulo?.trim()) {
      alert('Escribe el título del libro.');
      return;
    }

    if (!this.libro.autor?.trim()) {
      alert('Escribe el autor del libro.');
      return;
    }

    if (!this.libro.categoria?.trim()) {
      alert('Selecciona una categoría.');
      return;
    }

    if (!this.libro.editorial?.trim()) {
      alert('Escribe la editorial.');
      return;
    }

    if (!this.libro.anio) {
      alert('Escribe el año del libro.');
      return;
    }

    if (!this.libro.paginas) {
      alert('Escribe el número de páginas.');
      return;
    }

    this.libro.usuarioId = this.authService.obtenerUsuarioId();

    if (!this.libro.usuarioId) {
      alert('No se encontró el usuario. Inicia sesión nuevamente.');
      return;
    }

    if (!this.libro.estadoPrestamo) {
      this.libro.estadoPrestamo = 'disponible';
    }

    if (!this.libro.calificacion || this.libro.calificacion < 1) {
      this.libro.calificacion = 1;
    }

    if (this.modoEdicion) {
      this.actualizarLibro();
    } else {
      this.agregarLibro();
    }
  }

  private construirLibroParaGuardar(): any {
    return {
      titulo: this.libro.titulo,
      autor: this.libro.autor,
      categoria: this.libro.categoria,
      estado: this.libro.estado,
      estadoPrestamo: this.libro.estadoPrestamo || 'disponible',
      editorial: this.libro.editorial,
      anio: this.libro.anio,
      paginas: this.libro.paginas,
      calificacion: this.libro.calificacion || 1,
      imagen: this.libro.imagen || '',
      resena: this.libro.resena || '',
      usuarioId: this.libro.usuarioId
    };
  }

  private agregarLibro(): void {
    const libroNuevo = this.construirLibroParaGuardar();

    this.librosService.agregarLibro(libroNuevo).subscribe({
      next: () => {
        alert('Libro guardado correctamente.');
        this.router.navigate(['/mislibros']);
      },
      error: (err) => {
        console.log('Error al guardar libro:', err.error);
        alert('No fue posible guardar el libro.');
      }
    });
  }

  private actualizarLibro(): void {
    const id = this.libro._id || this.libro.id || this.idLibro;

    if (!id) {
      alert('No se encontró el libro.');
      return;
    }

    const libroActualizado = this.construirLibroParaGuardar();

    this.librosService.actualizarLibro(id, libroActualizado).subscribe({
      next: () => {
        alert('Libro actualizado correctamente.');
        this.router.navigate(['/mislibros']);
      },
      error: (err) => {
        console.log('Error al actualizar libro:', err.error);
        alert('No fue posible actualizar el libro.');
      }
    });
  }
}