using Microsoft.AspNetCore.Mvc;
using ReservationReturnApi.Models;
using ReservationReturnApi.Services;

namespace ReservationReturnApi.Controllers;

[ApiController]
public class ReservationReturnController : ControllerBase
{
    private readonly ReservationReturnService _service;
    private readonly ILogger<ReservationReturnController> _logger;

    public ReservationReturnController(
        ReservationReturnService service,
        ILogger<ReservationReturnController> logger)
    {
        _service = service;
        _logger = logger;
    }

    [HttpGet("/health/live")]
    public IActionResult Live()
    {
        _logger.LogInformation("GET /health/live - Respuesta 200");

        return Ok(new { status = "Healthy" });
    }

    [HttpGet("/health/ready")]
    public async Task<IActionResult> Ready()
    {
        try
        {
            _logger.LogInformation("GET /health/ready - Inicio");

            var available = await _service.IsDatabaseAvailableAsync();

            if (!available)
            {
                _logger.LogWarning(
                    "GET /health/ready - PostgreSQL no disponible");

                return StatusCode(
                    StatusCodes.Status503ServiceUnavailable,
                    new { status = "Unhealthy" });
            }

            _logger.LogInformation(
                "GET /health/ready - Respuesta 200");

            return Ok(new { status = "Healthy" });
        }
        catch (Exception ex)
        {
            _logger.LogError(
                ex,
                "GET /health/ready - Error inesperado");

            return StatusCode(
                StatusCodes.Status503ServiceUnavailable,
                new { status = "Unhealthy" });
        }
    }

    [HttpGet("/api/reservations")]
    public async Task<IActionResult> GetAll()
    {
        try
        {
            _logger.LogInformation(
                "GET /api/reservations - Inicio");

            var reservations = await _service.GetAllAsync();

            _logger.LogInformation(
                "GET /api/reservations - Respuesta 200. Reservas: {Count}",
                reservations.Count);

            return Ok(reservations);
        }
        catch (Exception ex)
        {
            _logger.LogError(
                ex,
                "GET /api/reservations - Error inesperado");

            return StatusCode(
                StatusCodes.Status503ServiceUnavailable,
                new { message = "PostgreSQL no está disponible." });
        }
    }

    [HttpGet("/api/reservations/{id:int}")]
    public async Task<IActionResult> GetById(int id)
    {
        try
        {
            _logger.LogInformation(
                "GET /api/reservations/{Id} - Inicio",
                id);

            var reservation = await _service.GetByIdAsync(id);

            if (reservation is null)
            {
                _logger.LogWarning(
                    "GET /api/reservations/{Id} - Reserva no encontrada",
                    id);

                return NotFound(new
                {
                    message = "Reserva no encontrada."
                });
            }

            _logger.LogInformation(
                "GET /api/reservations/{Id} - Respuesta 200",
                id);

            return Ok(reservation);
        }
        catch (Exception ex)
        {
            _logger.LogError(
                ex,
                "GET /api/reservations/{Id} - Error inesperado",
                id);

            return StatusCode(
                StatusCodes.Status503ServiceUnavailable,
                new { message = "PostgreSQL no está disponible." });
        }
    }

    [HttpPost("/api/reservations")]
    public async Task<IActionResult> Create(
        ReservationReturn reservation)
    {
        try
        {
            _logger.LogInformation(
                "POST /api/reservations - Inicio");

            var createdReservation =
                await _service.CreateAsync(reservation);

            _logger.LogInformation(
                "POST /api/reservations - Reserva creada. Id: {Id}",
                createdReservation.Id);

            return CreatedAtAction(
                nameof(GetById),
                new { id = createdReservation.Id },
                createdReservation);
        }
        catch (Exception ex)
        {
            _logger.LogError(
                ex,
                "POST /api/reservations - Error inesperado");

            return StatusCode(
                StatusCodes.Status503ServiceUnavailable,
                new { message = "PostgreSQL no está disponible." });
        }
    }
}