using UsersApi.Models;

namespace UsersApi.Services;

public class UserService : IUserService
{
    private readonly List<User> _users =
    [
        new User { Id = 1, Nombre = "Juan Pérez", Correo = "juan.perez@example.com", Edad = 25, Estado = true },
        new User { Id = 2, Nombre = "María López", Correo = "maria.lopez@example.com", Edad = 30, Estado = true },
        new User { Id = 3, Nombre = "Carlos García", Correo = "carlos.garcia@example.com", Edad = 28, Estado = true },
        new User { Id = 4, Nombre = "Ana Martínez", Correo = "ana.martinez@example.com", Edad = 22, Estado = true },
        new User { Id = 5, Nombre = "Luis Hernández", Correo = "luis.hernandez@example.com", Edad = 35, Estado = false },
        new User { Id = 6, Nombre = "Sofía Ramírez", Correo = "sofia.ramirez@example.com", Edad = 27, Estado = true },
        new User { Id = 7, Nombre = "Pedro Castillo", Correo = "pedro.castillo@example.com", Edad = 31, Estado = true },
        new User { Id = 8, Nombre = "Laura Morales", Correo = "laura.morales@example.com", Edad = 24, Estado = true },
        new User { Id = 9, Nombre = "Diego Flores", Correo = "diego.flores@example.com", Edad = 29, Estado = false },
        new User { Id = 10, Nombre = "Gabriela Torres", Correo = "gabriela.torres@example.com", Edad = 26, Estado = true },
        new User { Id = 11, Nombre = "Andrés Vásquez", Correo = "andres.vasquez@example.com", Edad = 33, Estado = true },
        new User { Id = 12, Nombre = "Valentina Cruz", Correo = "valentina.cruz@example.com", Edad = 21, Estado = true },
        new User { Id = 13, Nombre = "Ricardo Mendoza", Correo = "ricardo.mendoza@example.com", Edad = 38, Estado = false },
        new User { Id = 14, Nombre = "Daniela Ortiz", Correo = "daniela.ortiz@example.com", Edad = 32, Estado = true },
        new User { Id = 15, Nombre = "Fernando Reyes", Correo = "fernando.reyes@example.com", Edad = 40, Estado = true }
    ];

    public IEnumerable<User> GetAll()
    {
        return _users;
    }

    public User? GetById(int id)
    {
        return _users.FirstOrDefault(user => user.Id == id);
    }

    public User Create(User user)
    {
        user.Id = _users.Count == 0
            ? 1
            : _users.Max(u => u.Id) + 1;

        _users.Add(user);

        return user;
    }

    public User? Update(int id, User user)
    {
        var existingUser = GetById(id);

        if (existingUser is null)
        {
            return null;
        }

        existingUser.Nombre = user.Nombre;
        existingUser.Correo = user.Correo;
        existingUser.Edad = user.Edad;
        existingUser.Estado = user.Estado;

        return existingUser;
    }

    public bool Delete(int id)
    {
        var user = GetById(id);

        if (user is null)
        {
            return false;
        }

        _users.Remove(user);

        return true;
    }
}