namespace MoneyStat.WebApi.Api.Dto.Transactions;

public record TransactionDto(
    Guid Id,
    decimal Amount,
    bool IsIncome,
    Guid TransactionCategoryId,
    DateTime Date,
    string? Comment);