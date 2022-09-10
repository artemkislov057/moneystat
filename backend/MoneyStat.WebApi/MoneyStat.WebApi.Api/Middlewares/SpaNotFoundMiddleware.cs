using MoneyStat.WebApi.Api.Dto.Common;
using MoneyStat.WebApi.Api.Extensions;

namespace MoneyStat.WebApi.Api.Middlewares;

public sealed class SpaNotFoundMiddleware
{
    private readonly RequestDelegate next;
    private readonly string baseApiPath;

    public SpaNotFoundMiddleware(RequestDelegate next, string baseApiPath)
    {
        this.next = next;
        this.baseApiPath = baseApiPath;
    }

    public async Task Invoke(HttpContext context)
    {
        if (context.GetEndpoint() is null && IsApiPath(context.Request.Path))
        {
            var dto = new ErrorDto
            {
                HttpCode = 404,
                Message = "Ресурс не найден"
            };
            await context.WriteJsonResponse(dto.HttpCode, dto);
        }
        else
        {
            await next.Invoke(context);
        }
    }

    private bool IsApiPath(PathString path) =>
        !string.IsNullOrWhiteSpace(path.Value) &&
        path.Value.StartsWith(baseApiPath, StringComparison.OrdinalIgnoreCase);
}