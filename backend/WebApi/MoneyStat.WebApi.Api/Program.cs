using System.Reflection;
using MoneyStat.WebApi.Api;
using MoneyStat.WebApi.Api.Extensions;
using MoneyStat.WebApi.Api.Middlewares;

Assembly.GetExecutingAssembly().LoadReferenceAssembliesByPredicate(a => a.FullName.StartsWith("MoneyStat"));

var builder = WebApplication.CreateBuilder(args);
builder.Host.UseLightInject(serviceRegistry => serviceRegistry.RegisterFrom<HostCompositionRoot>());
builder.Configuration
    .AddJsonFile($"local.{builder.Environment.EnvironmentName}.json", optional: true, reloadOnChange: true);

var configuration = builder.Configuration;
var appSettings = configuration.Get<AppSettings>() ?? throw new InvalidOperationException();

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(appSettings);
builder.Services.AddPostgresDbContext(configuration);
builder.Services.AddIdentity();
builder.Services.AddAuthentication();
builder.Services.AddAuthorization();
builder.Services.ConfigureApplicationCookieCustom();
builder.Services.AddRouting();
builder.Services.AddControllersCustom();

var app = builder.Build();

app.MigrateDatabase();

// Configure the HTTP request pipeline.
app.UseForwardedHeadersCustom();

app.UseSwaggerCustom(appSettings);

app.UseMiddleware<ExceptionHandlerMiddleware>();

app.UseHttpsRedirection();

app.UseRouting();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();