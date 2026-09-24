using Microsoft.EntityFrameworkCore;
using ReservationReturnApi.Data;
using ReservationReturnApi.Models;

namespace ReservationReturnApi.Services;

public class ReservationReturnService
{
    private readonly AppDbContext _context;

    public ReservationReturnService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<bool> IsDatabaseAvailableAsync()
    {
        try
        {
            return await _context.Database.CanConnectAsync();
        }
        catch
        {
            return false;
        }
    }

    public async Task<List<ReservationReturn>> GetAllAsync()
    {
        return await _context.ReservationsReturns
            .AsNoTracking()
            .OrderBy(x => x.Id)
            .ToListAsync();
    }

    public async Task<ReservationReturn?> GetByIdAsync(int id)
    {
        return await _context.ReservationsReturns
            .AsNoTracking()
            .FirstOrDefaultAsync(x => x.Id == id);
    }

    public async Task<ReservationReturn> CreateAsync(
        ReservationReturn reservation)
    {
        _context.ReservationsReturns.Add(reservation);

        await _context.SaveChangesAsync();

        return reservation;
    }
}