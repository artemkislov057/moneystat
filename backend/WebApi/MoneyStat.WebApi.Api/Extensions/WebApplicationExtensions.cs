using Microsoft.EntityFrameworkCore;

namespace MoneyStat.WebApi.Api.Extensions;

public static class WebApplicationExtensions
{
    public static void MigrateDatabase<TDbContext>(this WebApplication app) where TDbContext : DbContext
    {
        using var scope = app.Services.CreateScope();
        var services = scope.ServiceProvider;

        var context = services.GetRequiredService<TDbContext>();
        context.Database.Migrate();
    }
}