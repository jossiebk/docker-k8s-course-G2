using Microsoft.AspNetCore.Mvc;
using UsersApi.Models;
using UsersApi.Services;

namespace UsersApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UsersController : ControllerBase
{
    private readonly IUserService _userService;
    private readonly ILogger<UsersController> _logger;

    public UsersController(
        IUserService userService,
        ILogger<UsersController> logger)
    {
        _userService = userService;
        _logger = logger;
    }

    [HttpGet]
    public ActionResult<IEnumerable<User>> GetAll()
    {
        try
        {
            _logger.LogInformation("GET /api/users - Inicio");

            var users = _userService.GetAll();

            _logger.LogInformation(
                "GET /api/users - Respuesta 200. Usuarios: {Count}",
                users.Count());

            return Ok(users);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "GET /api/users - Error inesperado");
            return StatusCode(500, "Ocurrió un error interno.");
        }
    }

    [HttpGet("{id:int}")]
    public ActionResult<User> GetById(int id)
    {
        try
        {
            _logger.LogInformation(
                "GET /api/users/{Id} - Inicio",
                id);

            var user = _userService.GetById(id);

            if (user is null)
            {
                _logger.LogWarning(
                    "GET /api/users/{Id} - Usuario no encontrado",
                    id);

                return NotFound();
            }

            _logger.LogInformation(
                "GET /api/users/{Id} - Respuesta 200",
                id);

            return Ok(user);
        }
        catch (Exception ex)
        {
            _logger.LogError(
                ex,
                "GET /api/users/{Id} - Error inesperado",
                id);

            return StatusCode(500, "Ocurrió un error interno.");
        }
    }

    [HttpPost]
    public ActionResult<User> Create(User user)
    {
        try
        {
            _logger.LogInformation(
                "POST /api/users - Inicio. Correo: {Correo}",
                user.Correo);

            var createdUser = _userService.Create(user);

            _logger.LogInformation(
                "POST /api/users - Usuario creado. Id: {Id}",
                createdUser.Id);

            return CreatedAtAction(
                nameof(GetById),
                new { id = createdUser.Id },
                createdUser);
        }
        catch (Exception ex)
        {
            _logger.LogError(
                ex,
                "POST /api/users - Error inesperado");

            return StatusCode(500, "Ocurrió un error interno.");
        }
    }

    [HttpPut("{id:int}")]
    public ActionResult<User> Update(int id, User user)
    {
        try
        {
            _logger.LogInformation(
                "PUT /api/users/{Id} - Inicio",
                id);

            var updatedUser = _userService.Update(id, user);

            if (updatedUser is null)
            {
                _logger.LogWarning(
                    "PUT /api/users/{Id} - Usuario no encontrado",
                    id);

                return NotFound();
            }

            _logger.LogInformation(
                "PUT /api/users/{Id} - Respuesta 200",
                id);

            return Ok(updatedUser);
        }
        catch (Exception ex)
        {
            _logger.LogError(
                ex,
                "PUT /api/users/{Id} - Error inesperado",
                id);

            return StatusCode(500, "Ocurrió un error interno.");
        }
    }

    [HttpDelete("{id:int}")]
    public IActionResult Delete(int id)
    {
        try
        {
            _logger.LogInformation(
                "DELETE /api/users/{Id} - Inicio",
                id);

            var deleted = _userService.Delete(id);

            if (!deleted)
            {
                _logger.LogWarning(
                    "DELETE /api/users/{Id} - Usuario no encontrado",
                    id);

                return NotFound();
            }

            _logger.LogInformation(
                "DELETE /api/users/{Id} - Respuesta 204",
                id);

            return NoContent();
        }
        catch (Exception ex)
        {
            _logger.LogError(
                ex,
                "DELETE /api/users/{Id} - Error inesperado",
                id);

            return StatusCode(500, "Ocurrió un error interno.");
        }
    }

    
    [HttpGet("/health/live")]
    public IActionResult Live()
    {
        return Ok(new { status = "Healthy" });
    }

    [HttpGet("/health/ready")]
    public IActionResult Ready()
    {
        return Ok(new { status = "Healthy" });
    }
}