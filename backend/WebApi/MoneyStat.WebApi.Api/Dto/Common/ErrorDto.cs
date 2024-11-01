namespace MoneyStat.WebApi.Api.Dto.Common;

public class ErrorDto
{
    /// <summary>
    /// Код HTTP ответа
    /// </summary>
    public int? HttpCode { get; set; }
    
    /// <summary>
    /// Внутренний код ошибки
    /// </summary>
    public int? ErrorCode { get; set; }
    
    /// <summary>
    /// Детали ошибки
    /// </summary>
    public string Message { get; set; }
}