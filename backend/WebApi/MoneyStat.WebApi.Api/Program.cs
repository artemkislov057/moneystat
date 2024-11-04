using System.Reflection;
using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.HttpOverrides;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using MoneyStat.DAL.DataBase.Entities;
using MoneyStat.DAL.Database.Postgres;
using MoneyStat.WebApi.Api;
using MoneyStat.WebApi.Api.Extensions;
using MoneyStat.WebApi.Api.Middlewares;

Assembly.GetExecutingAssembly().LoadReferenceAssembliesByPredicate(a => a.FullName.StartsWith("MoneyStat"));

var builder = WebApplication.CreateBuilder(args);
builder.Host.UseLightInject(serviceRegistry => serviceRegistry.RegisterFrom<HostCompositionRoot>());

var configuration = builder.Configuration;
var appSettings = configuration.Get<AppSettings>() ?? throw new InvalidOperationException();

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(configure =>
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

var dbConnection = configuration.GetConnectionString("MoneyStatDb");
builder.Services.AddDbContext<MoneyStatDbContextPostgres>(options => options.UseNpgsql(dbConnection));

builder.Services.AddIdentity<User, IdentityRole<Guid>>(configure =>
    {
        configure.Password.RequiredLength = 1;
        configure.Password.RequireNonAlphanumeric = false;
        configure.Password.RequireUppercase = false;
        configure.Password.RequireLowercase = false;
        configure.Password.RequireDigit = false;
    })
    .AddEntityFrameworkStores<MoneyStatDbContextPostgres>();
builder.Services.AddAuthentication();
builder.Services.AddAuthorization();
builder.Services.ConfigureApplicationCookie(configure =>
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
builder.Services.AddRouting();
builder.Services
    .AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingNull;
        options.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter());
    });

var app = builder.Build();

app.MigrateDatabase<MoneyStatDbContextPostgres>();

// Configure the HTTP request pipeline.
app.UseForwardedHeaders(new ForwardedHeadersOptions
{
    ForwardedHeaders = ForwardedHeaders.XForwardedFor | ForwardedHeaders.XForwardedProto
});

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(options =>
    {
        options.SwaggerEndpoint("/swagger/v1/swagger.json", "v1");
        options.RoutePrefix = "swagger";
    });
}

app.UseMiddleware<ExceptionHandlerMiddleware>();
app.UseHttpsRedirection();

app.UseRouting();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();