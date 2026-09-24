namespace ReservationReturnApi.Models;

public class ReservationReturn
{
    public int Id { get; set; }

    public string TituloLibro { get; set; } = string.Empty;

    public string NombreUsuario { get; set; } = string.Empty;

    public DateTime FechaReserva { get; set; }

    public DateTime? FechaDevolucion { get; set; }

    public int DiasReservados { get; set; }
}