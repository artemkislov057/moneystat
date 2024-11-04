using System.Text.Json.Serialization;
using LightInject;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.HttpOverrides;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using MoneyStat.DAL.DataBase.Entities;
using MoneyStat.DAL.Database.Postgres;
using MoneyStat.WebApi.Api.Middlewares;

namespace MoneyStat.WebApi.Api;

public class Startup
{
    private readonly AppSettings appSettings;
    private const string ApiBase = "/api";

    public Startup(IConfiguration configuration)
    {
        appSettings = configuration.Get<AppSettings>();
    }

    public void ConfigureServices(IServiceCollection services)
    {
        var dbConnection = appSettings.GetConnectionString("MoneyStatDb");
        services.AddDbContext<MoneyStatDbContextPostgres>(options => options.UseNpgsql(dbConnection));
        services.AddIdentity<User, IdentityRole<Guid>>(configure =>
            {
                configure.Password.RequiredLength = 1;
                configure.Password.RequireNonAlphanumeric = false;
                configure.Password.RequireUppercase = false;
                configure.Password.RequireLowercase = false;
                configure.Password.RequireDigit = false;
            })
            .AddEntityFrameworkStores<MoneyStatDbContextPostgres>();
        services.AddAuthentication();
        services.AddAuthorization();
        services.ConfigureApplicationCookie(configure =>
        {
            configure.Events = new CookieAuthenticationEvents
            {
                OnRedirectToLogin = redirectContext =>
                {
                    if (redirectContext.Request.Path.StartsWithSegments(ApiBase) &&
                        redirectContext.Response.StatusCode == 200)
                    {
                        redirectContext.Response.StatusCode = 401;
                    }

                    return Task.CompletedTask;
                },
                OnRedirectToAccessDenied = redirectContext =>
                {
                    if (redirectContext.Request.Path.StartsWithSegments(ApiBase) &&
                        redirectContext.Response.StatusCode == 200)
                    {
                        redirectContext.Response.StatusCode = 403;
                    }

                    return Task.CompletedTask;
                }
            };
        });
        services.AddRouting();
        services
            .AddControllers()
            .AddJsonOptions(options =>
            {
                options.JsonSerializerOptions.DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingNull;
                options.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter());
            });
        services.AddSwaggerGen(configure =>
        {
            configure.SwaggerDoc("v1", new Microsoft.OpenApi.Models.OpenApiInfo
            {
                Version = "v1",
                Title = $"{appSettings.AppName} API",
                Description = $"Public API for project \"{appSettings.AppName}\""
            });
            var xmlFile = $"{System.Reflection.Assembly.GetExecutingAssembly().GetName().Name}.xml";
            var xmlPath = Path.Combine(AppContext.BaseDirectory, xmlFile);
            configure.IncludeXmlComments(xmlPath);
        });
        services.AddCors();
    }

    public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
    {
        using (var dbContext = app.ApplicationServices.GetService<MoneyStatDbContextPostgres>()!)
        {
            dbContext.Database.Migrate();
        }

        app.UseForwardedHeaders(new ForwardedHeadersOptions
        {
            ForwardedHeaders = ForwardedHeaders.XForwardedFor | ForwardedHeaders.XForwardedProto
        });
        app.UseMiddleware<ExceptionHandlerMiddleware>();

        if (env.IsDevelopment())
        {
            app.UseSwagger();
            app.UseSwaggerUI(options =>
            {
                options.SwaggerEndpoint("/swagger/v1/swagger.json", "v1");
                options.RoutePrefix = "swagger";
            });
            app.UseCors(builder => builder
                .WithOrigins(appSettings.CorsOrigins)
                .AllowAnyHeader()
                .AllowAnyMethod()
                .AllowCredentials());
        }

        app.UseRouting();

        app.UseAuthentication();
        app.UseAuthorization();

        app.UseEndpoints(endpoints => { endpoints.MapControllers(); });
    }

    public void ConfigureContainer(IServiceContainer container)
    {
        var assemblies = AppDomain.CurrentDomain.GetAssemblies()
            .Where(assembly => assembly.FullName?.StartsWith("MoneyStat") == true);
        foreach (var assembly in assemblies)
        {
            container.RegisterAssembly(assembly, () => new PerRequestLifeTime(),
                (serviceType, implementationType) => serviceType.IsInterface);
        }
    }
}