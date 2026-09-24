export interface Reservation {
  id: number;
  tituloLibro: string;
  nombreUsuario: string;
  fechaReserva: string;
  fechaDevolucion: string | null;
  diasReservados: number;
}