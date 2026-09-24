using UsersApi.Models;

namespace UsersApi.Services;

public interface IUserService
{
    IEnumerable<User> GetAll();
    User? GetById(int id);
    User Create(User user);
    User? Update(int id, User user);
    bool Delete(int id);
}