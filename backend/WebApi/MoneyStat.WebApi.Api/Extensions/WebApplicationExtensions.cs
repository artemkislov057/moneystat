using Microsoft.AspNetCore.HttpOverrides;
using Microsoft.EntityFrameworkCore;
using MoneyStat.DAL.Database.Postgres;

namespace MoneyStat.WebApi.Api.Extensions;

public static class WebApplicationExtensions
{
    public static void MigrateDatabase(this WebApplication app)
    {
        using var scope = app.Services.CreateScope();
        var services = scope.ServiceProvider;

        var context = services.GetRequiredService<MoneyStatDbContextPostgres>();
        context.Database.Migrate();
    }

    public static void UseForwardedHeadersCustom(this WebApplication app)
    {
        app.UseForwardedHeaders(new ForwardedHeadersOptions
        {
            ForwardedHeaders = ForwardedHeaders.XForwardedFor | ForwardedHeaders.XForwardedProto
        });
    }

    public static void UseSwaggerCustom(this WebApplication app, AppSettings appSettings)
    {
        if (!app.Environment.IsDevelopment() && !appSettings.UseSwagger)
        {
            return;
        }

        app.UseSwagger();
        app.UseSwaggerUI(options =>
        {
            options.SwaggerEndpoint("/swagger/v1/swagger.json", "v1");
            options.RoutePrefix = "swagger";
        });
    }
}