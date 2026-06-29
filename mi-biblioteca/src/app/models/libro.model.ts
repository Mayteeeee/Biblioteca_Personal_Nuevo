export interface Libro {
  _id?: string;
  id?: string;
  titulo: string;
  autor?: string;
  categoria?: string;
  estado: string;
  estadoPrestamo?: string;
  editorial?: string;
  anio?: number;
  paginas?: number;
  calificacion: number;
  imagen?: string | null;
  resena?: string;
  usuarioId?: string;
}