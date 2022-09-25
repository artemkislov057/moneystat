using System.Text.Json.Serialization;
using LightInject;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.SpaServices;
using Microsoft.AspNetCore.StaticFiles;
using Microsoft.EntityFrameworkCore;
using Microsoft.Net.Http.Headers;
using MoneyStat.DataBase;
using MoneyStat.DataBase.Entities;
using MoneyStat.WebApi.Api.Middlewares;

namespace MoneyStat.WebApi.Api;

public class Startup
{
    private readonly IConfiguration appConfiguration;
    private const string ApiBase = "/api";

    public Startup(IConfiguration appConfiguration)
    {
        this.appConfiguration = appConfiguration;
    }

    public void ConfigureServices(IServiceCollection services)
    {
        var dbConnection = appConfiguration.GetConnectionString("MoneyStatDb");
        services.AddDbContext<MoneyStatDbContext>(options => options.UseSqlServer(dbConnection));
        services.AddIdentity<User, IdentityRole<Guid>>(configure =>
            {
                configure.Password.RequiredLength = 1;
                configure.Password.RequireNonAlphanumeric = false;
                configure.Password.RequireUppercase = false;
                configure.Password.RequireLowercase = false;
                configure.Password.RequireDigit = false;
            })
            .AddEntityFrameworkStores<MoneyStatDbContext>();
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
                Title = $"{appConfiguration["AppName"]} API",
                Description = $"Public API for project \"{appConfiguration["AppName"]}\""
            });
            var xmlFile = $"{System.Reflection.Assembly.GetExecutingAssembly().GetName().Name}.xml";
            var xmlPath = Path.Combine(AppContext.BaseDirectory, xmlFile);
            configure.IncludeXmlComments(xmlPath);
        });
        services.AddSpaStaticFiles(configure => { configure.RootPath = "wwwroot"; });
        services.AddCors();
    }

    public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
    {
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
                .WithOrigins(appConfiguration.GetSection("CorsOrigins").Get<string[]>() ?? Array.Empty<string>())
                .AllowAnyHeader()
                .AllowAnyMethod()
                .AllowCredentials());
        }

        app.UseHttpsRedirection();
        app.UseSpaStaticFiles();

        app.UseRouting();

        app.UseAuthentication();
        app.UseAuthorization();

        app.UseEndpoints(endpoints => { endpoints.MapControllers(); });
        app.UseMiddleware<SpaNotFoundMiddleware>(ApiBase);
        app.UseSpa(ConfigureSpa);
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

    private static void ConfigureSpa(ISpaBuilder spa)
    {
        spa.Options.DefaultPageStaticFileOptions = new StaticFileOptions
            { OnPrepareResponse = DisableCacheIndexPage };

        static void DisableCacheIndexPage(StaticFileResponseContext responseContext)
        {
            if (responseContext.File.Name != "index.html")
                return;

            var headers = responseContext.Context.Response.GetTypedHeaders();
            var cacheControlHeaderValue = new CacheControlHeaderValue { NoStore = true, NoCache = true };

            headers.CacheControl = cacheControlHeaderValue;
        }
    }
}