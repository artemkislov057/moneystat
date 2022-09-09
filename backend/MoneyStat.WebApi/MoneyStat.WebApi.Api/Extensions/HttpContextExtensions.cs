using System.Text.Json;

namespace MoneyStat.WebApi.Api.Extensions;

public static class HttpContextExtensions
{
    public static async Task WriteJsonResponse<T>(this HttpContext context, int status, T dto)
    {
        context.Response.StatusCode = status;
        context.Response.ContentType = "application/json";
        await using var stream = new StreamWriter(context.Response.Body);
        await stream.WriteAsync(JsonSerializer.Serialize(dto));
    }
}