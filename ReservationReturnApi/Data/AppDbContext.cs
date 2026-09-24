using Microsoft.EntityFrameworkCore;
using ReservationReturnApi.Models;

namespace ReservationReturnApi.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options)
        : base(options)
    {
    }

    public DbSet<ReservationReturn> ReservationsReturns => Set<ReservationReturn>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<ReservationReturn>(entity =>
        {
            entity.ToTable("reservations_returns");

            entity.HasKey(x => x.Id);

            entity.Property(x => x.Id)
                .ValueGeneratedOnAdd();

            entity.Property(x => x.TituloLibro)
                .IsRequired()
                .HasMaxLength(255);

            entity.Property(x => x.NombreUsuario)
                .IsRequired()
                .HasMaxLength(255);

            entity.Property(x => x.FechaReserva)
                .IsRequired()
                .HasColumnType("timestamp without time zone");

            entity.Property(x => x.FechaDevolucion)
                .IsRequired(false)
                .HasColumnType("timestamp without time zone");

            entity.Property(x => x.DiasReservados)
                .IsRequired();
        });
    }
}