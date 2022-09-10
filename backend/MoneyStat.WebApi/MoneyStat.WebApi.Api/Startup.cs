using Microsoft.AspNetCore.SpaServices;
using Microsoft.AspNetCore.StaticFiles;
using Microsoft.Net.Http.Headers;
using MoneyStat.WebApi.Api.Middlewares;

namespace MoneyStat.WebApi.Api;

public sealed class Startup
{
    private readonly string ApiBase = "/api";
    
    public void ConfigureServices(IServiceCollection services)
    {
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