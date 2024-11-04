using System.Reflection;
using LightInject;
using MoneyStat.WebApi.Api.Extensions;

namespace MoneyStat.WebApi.Api;

public class HostCompositionRoot : ICompositionRoot
{
    public void Compose(IServiceRegistry serviceRegistry)
    {
        RegisterSolutionAssemblies(serviceRegistry);
    }

    private static void RegisterSolutionAssemblies(IServiceRegistry serviceRegistry)
    {
        var assemblies =
            AppDomain.CurrentDomain.GetAssembliesByPredicate(a => a.FullName?.StartsWith("MoneyStat") == true);

        foreach (var assembly in assemblies)
        {
            RegisterAssembly(assembly, serviceRegistry);
        }
    }

    private static void RegisterAssembly(Assembly assembly, IServiceRegistry serviceRegistry)
    {
        serviceRegistry.RegisterAssembly(
            assembly,
            () => new PerRequestLifeTime(),
            (serviceType, _) => serviceType.IsInterface);
    }
}