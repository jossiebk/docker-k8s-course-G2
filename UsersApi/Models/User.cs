namespace UsersApi.Models;

public class User
{
    public int Id { get; set; }
    public string Nombre { get; set; } = string.Empty;
    public string Correo { get; set; } = string.Empty;
    public int Edad { get; set; }
    public bool Estado { get; set; }
}