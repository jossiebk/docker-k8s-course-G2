export interface Book {
  id: number;
  titulo: string;
  genero: string;
  autores: string;
  isbn: string;
  edicion: string;
  editorial: string;
  lugarDePublicacion: string;
  noPaginas: number;
  resumen: string;
  precio: number;
  disponibleReserva: boolean;
}