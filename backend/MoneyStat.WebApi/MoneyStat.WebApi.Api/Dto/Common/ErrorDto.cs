namespace MoneyStat.WebApi.Api.Dto.Common;

public class ErrorDto
{
    public int HttpCode { get; set; }
    public int ErrorCode { get; set; }
    public string Message { get; set; }
}