using Microsoft.AspNetCore.Mvc;
using MoneyStat.WebApi.Api.Extensions;

namespace MoneyStat.WebApi.Api.Attributes;

public sealed class ApiRouteAttribute : RouteAttribute
{
    public ApiRouteAttribute()
        : this("[controller]")
    {
    }

    public ApiRouteAttribute(Type type)
        : this(type.Name.RemoveLastSubstring("controller").PascalToKebabCase())
    {
    }
    
    public ApiRouteAttribute(string template)
        : base($"api/{template}")
    {
    }
}