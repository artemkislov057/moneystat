using LightInject.Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore;
using MoneyStat.DataBase;
using MoneyStat.WebApi.Model.Services;

namespace MoneyStat.WebApi.Api;

public static class Program
{
    public static void Main(string[] args)
    {
        GetUsedTypes();
        WebHost.CreateDefaultBuilder<Startup>(args)
            .UseLightInject()
            .Build()
            .Run();
    }

    private static Type[] GetUsedTypes()
        => new[]
        {
            typeof(UserService),
            typeof(MoneyStatDbContext)
        };
}