using System.Reflection;

namespace MoneyStat.WebApi.Api.Extensions;

public static class AppDomainExtensions
{
    public static IEnumerable<Assembly> GetAssembliesByPredicate(this AppDomain appDomain,
        Predicate<Assembly> predicate)
    {
        return appDomain.GetAssemblies().Where(assembly => predicate(assembly));
    }
}