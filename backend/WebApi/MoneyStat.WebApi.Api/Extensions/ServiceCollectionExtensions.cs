using System.Reflection;
using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using MoneyStat.DAL.DataBase.Entities;
using MoneyStat.DAL.Database.Postgres;

namespace MoneyStat.WebApi.Api.Extensions;

public static class ServiceCollectionExtensions
{
    public static void AddSwaggerGen(this IServiceCollection services, AppSettings appSettings)
    {
        services.AddSwaggerGen(configure =>
        {
            configure.SwaggerDoc("v1", new Microsoft.OpenApi.Models.OpenApiInfo
            {
                Version = "v1",
                Title = $"{appSettings.AppName} API",
                Description = $"Public API for project \"{appSettings.AppName}\""
            });
            var xmlFile = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
            var xmlPath = Path.Combine(AppContext.BaseDirectory, xmlFile);
            configure.IncludeXmlComments(xmlPath);
        });
    }

    public static void AddPostgresDbContext(this IServiceCollection services, IConfiguration configuration)
    {
        var connectionString = configuration.GetConnectionString("MoneyStatDb");
        services.AddDbContext<MoneyStatDbContextPostgres>(options => options.UseNpgsql(connectionString));
    }

    public static void AddIdentity(this IServiceCollection services)
    {
        services.AddIdentity<User, IdentityRole<Guid>>(configure =>
            {
                configure.Password.RequiredLength = 1;
                configure.Password.RequireNonAlphanumeric = false;
                configure.Password.RequireUppercase = false;
                configure.Password.RequireLowercase = false;
                configure.Password.RequireDigit = false;
            })
            .AddEntityFrameworkStores<MoneyStatDbContextPostgres>();
    }

    public static void ConfigureApplicationCookieCustom(this IServiceCollection services)
    {
        services.ConfigureApplicationCookie(configure =>
        {
            configure.Events = new CookieAuthenticationEvents
            {
                OnRedirectToLogin = redirectContext =>
                {
                    redirectContext.Response.StatusCode = 401;
                    return Task.CompletedTask;
                },
                OnRedirectToAccessDenied = redirectContext =>
                {
                    redirectContext.Response.StatusCode = 403;
                    return Task.CompletedTask;
                }
            };
        });
    }

    public static void AddControllersCustom(this IServiceCollection services)
    {
        services.AddControllers()
            .AddJsonOptions(options =>
            {
                options.JsonSerializerOptions.DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingNull;
                options.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter());
            });
    }
}