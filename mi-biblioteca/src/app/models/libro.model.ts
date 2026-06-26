export interface Libro {
  id?: string;
  titulo: string;
  autor?: string;
  categoria?: string;
  estado: string;
  editorial?: string;
  anio?: number;
  paginas?: number;
  calificacion: number;
  imagen?: string | null;
  resena?: string;
}