using Microsoft.EntityFrameworkCore;
using Npgsql;
using ReservationReturnApi.Data;
using ReservationReturnApi.Services;

var builder = WebApplication.CreateBuilder(args);

var connectionString =
    Environment.GetEnvironmentVariable("POSTGRES_CONNECTION_STRING");

if (!string.IsNullOrWhiteSpace(connectionString))
{
    builder.Services.AddDbContext<AppDbContext>(options =>
        options.UseNpgsql(connectionString));
}
else
{
    builder.Services.AddDbContext<AppDbContext>(options =>
        options.UseNpgsql());
}

builder.Services.AddScoped<ReservationReturnService>();

builder.Services.AddControllers();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy
            .AllowAnyOrigin()
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

var app = builder.Build();

app.UseCors("AllowAll");

await InitializeDatabaseAsync(
    connectionString,
    app.Services);

app.MapControllers();

app.Run();


static async Task InitializeDatabaseAsync(
    string? connectionString,
    IServiceProvider services)
{
    if (string.IsNullOrWhiteSpace(connectionString))
    {
        return;
    }

    try
    {
        var databaseConnectionString =
            new NpgsqlConnectionStringBuilder(connectionString);

        var databaseName = databaseConnectionString.Database;

        if (string.IsNullOrWhiteSpace(databaseName))
        {
            return;
        }

        databaseConnectionString.Database = "postgres";

        await using (var connection =
            new NpgsqlConnection(databaseConnectionString.ConnectionString))
        {
            await connection.OpenAsync();

            await using var command = connection.CreateCommand();

            command.CommandText = """
                SELECT 1
                FROM pg_database
                WHERE datname = @databaseName
                """;

            command.Parameters.AddWithValue(
                "databaseName",
                databaseName);

            var exists = await command.ExecuteScalarAsync();

            if (exists is null)
            {
                var escapedDatabaseName =
                    "\"" + databaseName.Replace("\"", "\"\"") + "\"";

                command.Parameters.Clear();

                command.CommandText =
                    $"CREATE DATABASE {escapedDatabaseName}";

                await command.ExecuteNonQueryAsync();
            }
        }

        using var scope = services.CreateScope();

        var dbContext =
            scope.ServiceProvider.GetRequiredService<AppDbContext>();

        await dbContext.Database.EnsureCreatedAsync();
    }
    catch (Exception ex)
    {
        var logger =
            services.GetRequiredService<
                ILoggerFactory>()
            .CreateLogger("DatabaseInitialization");

        logger.LogError(
            ex,
            "No fue posible inicializar PostgreSQL.");
    }
}