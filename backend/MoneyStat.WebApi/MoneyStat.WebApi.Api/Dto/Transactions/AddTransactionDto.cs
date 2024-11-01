namespace MoneyStat.WebApi.Api.Dto.Transactions;

public record AddTransactionDto(
    decimal Amount,
    bool IsIncome,
    Guid TransactionCategoryId,
    DateTime? Date,
    string? Comment);