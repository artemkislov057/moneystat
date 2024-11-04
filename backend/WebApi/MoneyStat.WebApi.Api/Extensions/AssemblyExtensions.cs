using System.Reflection;

namespace MoneyStat.WebApi.Api.Extensions;

public static class AssemblyExtensions
{
    public static void LoadReferenceAssembliesByPredicate(this Assembly assembly, Func<AssemblyName, bool> predicate)
    {
        var assemblyNamesToLoad = GetReferencesAssemblies(assembly, predicate);
        var assemblyNamesLoaded = new HashSet<AssemblyName>();

        while (assemblyNamesToLoad.Count > 0)
        {
            var assemblyNamesNextToLoad = new List<AssemblyName>();
            var unloadedAssemblies =
                assemblyNamesToLoad.Where(assemblyName => !assemblyNamesLoaded.Contains(assemblyName));

            foreach (var assemblyName in unloadedAssemblies)
            {
                var loadedAssembly = Assembly.Load(assemblyName);
                assemblyNamesLoaded.Add(assemblyName);
                var referencesAssemblies = GetReferencesAssemblies(loadedAssembly, predicate);
                assemblyNamesNextToLoad.AddRange(referencesAssemblies);
            }

            assemblyNamesToLoad = assemblyNamesNextToLoad;
        }
    }

    private static List<AssemblyName> GetReferencesAssemblies(Assembly assembly, Func<AssemblyName, bool> predicate) =>
        assembly.GetReferencedAssemblies()
            .Where(predicate)
            .ToList();
}