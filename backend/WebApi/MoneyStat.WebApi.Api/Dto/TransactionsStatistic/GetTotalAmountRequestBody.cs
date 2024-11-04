namespace MoneyStat.WebApi.Api.Dto.TransactionsStatistic;

public record GetTotalAmountRequestBody
{
    public required bool IsIncome { get; init; }
    public required DateTime BeginDate { get; init; }
    public required DateTime EndDate { get; init; }
    public Guid? TransactionCategoryId { get; init; }
}