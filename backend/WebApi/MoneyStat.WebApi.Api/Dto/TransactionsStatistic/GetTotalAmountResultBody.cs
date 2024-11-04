namespace MoneyStat.WebApi.Api.Dto.TransactionsStatistic;

public record GetTotalAmountResultBody
{
    public decimal TotalAmount { get; set; }
}