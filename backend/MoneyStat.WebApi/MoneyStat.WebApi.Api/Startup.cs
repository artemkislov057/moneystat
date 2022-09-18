using LightInject;
using Microsoft.AspNetCore.SpaServices;
using Microsoft.AspNetCore.StaticFiles;
using Microsoft.EntityFrameworkCore;
using Microsoft.Net.Http.Headers;
using MoneyStat.DataBase;
using MoneyStat.WebApi.Api.Middlewares;

namespace MoneyStat.WebApi.Api;

public class Startup
{
    private readonly IConfiguration configuration;
    private const string ApiBase = "/api";

    public Startup(IConfiguration configuration)
    {
        this.configuration = configuration;
    }

    public void ConfigureServices(IServiceCollection services)
    {
        var dbConnection = configuration.GetConnectionString("LocalConnection");
        services.AddDbContext<MoneyStatDbContext>(options => options.UseSqlServer(dbConnection));
        services.AddRouting();
        services.AddControllers();
        services.AddSwaggerGen();
        services.AddSpaStaticFiles(configure => { configure.RootPath = "wwwroot"; });
    }

    public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
    {
        app.UseSwagger();
        app.UseSwaggerUI(options =>
        {
            options.SwaggerEndpoint("/swagger/v1/swagger.json", "v1");
            options.RoutePrefix = "swagger";
        });

        app.UseSpaStaticFiles();

        app.UseRouting();

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