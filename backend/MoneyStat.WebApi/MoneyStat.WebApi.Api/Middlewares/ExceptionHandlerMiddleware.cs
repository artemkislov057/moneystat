using MoneyStat.Infra.Helpers;
using MoneyStat.WebApi.Api.Dto.Common;
using MoneyStat.WebApi.Api.Extensions;

namespace MoneyStat.WebApi.Api.Middlewares;

public class ExceptionHandlerMiddleware
{
    private readonly RequestDelegate next;

    public ExceptionHandlerMiddleware(RequestDelegate next) 
        => this.next = next;

    public async Task Invoke(HttpContext context)
    {
        try
        {
            await next.Invoke(context);
        }
        catch (BadRequestException e)
        {
            var dto = new ErrorDto()
            {
                HttpCode = 400,
                Message = e.Message
            };
            await context.WriteJsonResponse(400, dto);
        }
        catch (Exception e)
        {
            var dto = new ErrorDto()
            {
                HttpCode = 500,
                Message = "Сервис временно недоступен"
            };
            await context.WriteJsonResponse(500, dto);
        }
    }
}